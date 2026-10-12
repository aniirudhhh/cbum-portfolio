"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { AnimationClip, Euler, Group, LinearSRGBColorSpace, LoopOnce, MathUtils, Mesh, MeshStandardMaterial, Quaternion, Texture } from "three";
import { markRobotReady } from "@/lib/startup";

type RobotModelProps = ThreeElements["group"] & {
  url?: string;
  interaction?: number;
  waveInteraction?: number;
  expression?: "happy" | "sad" | "surprised" | "heart";
  expressionActive?: boolean;
  reducedMotion?: boolean;
  headLook?: [number, number];
};

export function RobotModel({ url = "/astra_robot.glb", interaction = 0, waveInteraction = 0, expression = "happy", expressionActive = false, reducedMotion = false, headLook = [0, 0], ...props }: RobotModelProps) {
  const group = useRef<Group>(null);
  const renderedFrames = useRef(0);
  const { scene: source, animations } = useGLTF(url);
  const invalidate = useThree((state) => state.invalidate);
  const { scene, graphics, materials, textures } = useMemo(() => {
    const scene = source.clone(true);
    const graphics: Mesh[] = [];
    const materials = new Map<MeshStandardMaterial, MeshStandardMaterial>();
    const textures: Texture[] = [];
    scene.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const cloneMaterial = (original: MeshStandardMaterial) => {
        let material = materials.get(original);
        if (!material) {
          material = original.clone();
          if (material.name.includes("cyan display")) {
            material.toneMapped = false;
            material.emissiveIntensity = 1.8;
            // This generated pixel mask stores linear cyan values.
            if (material.emissiveMap) {
              const texture = material.emissiveMap.clone();
              texture.colorSpace = LinearSRGBColorSpace;
              texture.needsUpdate = true;
              textures.push(texture);
              material.emissiveMap = texture;
              material.map = texture;
            }
          }
          materials.set(original, material);
        }
        return material;
      };
      object.material = Array.isArray(object.material)
        ? object.material.map((material) => cloneMaterial(material as MeshStandardMaterial))
        : cloneMaterial(object.material as MeshStandardMaterial);
      if (["Eye_L", "Eye_R", "Mouth"].includes(object.name)) {
        object.morphTargetInfluences = object.morphTargetInfluences?.map(() => 0);
        graphics.push(object);
      }
    });
    return { scene, graphics, materials, textures };
  }, [source]);

  // Use the welcome's body gestures while click-selected expressions control the face.
  const gestures = useMemo(() => animations.map((clip) => new AnimationClip(
    clip.name, clip.duration,
    clip.tracks.filter((track) => !track.name.includes("morphTargetInfluences") && !track.name.startsWith("Astra_Root.") && !track.name.startsWith("Head_Control.") && !track.name.startsWith("Shoulder_Control_-1.") && !track.name.startsWith("Wrist_Control_-1.")),
  )), [animations]);
  const { actions, mixer } = useAnimations(gestures, group);
  const head = useMemo(() => {
    const object = scene.getObjectByName("Head_Control");
    return { object, rest: object?.quaternion.clone(), angles: new Euler(), offset: new Quaternion() };
  }, [scene]);

  const rightArm = useMemo(() => {
    const shoulder = scene.getObjectByName("Shoulder_Control_-1");
    const wrist = scene.getObjectByName("Wrist_Control_-1");
    return { shoulder, wrist, shoulderRest: shoulder?.quaternion.clone(), wristRest: wrist?.quaternion.clone(), offset: new Quaternion(), angles: new Euler() };
  }, [scene]);
  const wave = useRef({ elapsed: 0, active: false });
  useEffect(() => {
    if (!waveInteraction || reducedMotion) return;
    wave.current = { elapsed: 0, active: true };
    invalidate();
  }, [waveInteraction, reducedMotion, invalidate]);

  useEffect(() => () => {
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
  }, [materials, textures]);

  useEffect(() => {
    invalidate();
  }, [expression, expressionActive, reducedMotion, invalidate]);

  useFrame((_, delta) => {
    if (renderedFrames.current < 2) {
      renderedFrames.current += 1;
      if (renderedFrames.current === 2) markRobotReady();
      else invalidate();
    }
    if (head.object && head.rest) {
      const pitch = reducedMotion ? 0 : headLook[0];
      const yaw = reducedMotion ? 0 : headLook[1];
      head.angles.set(
        reducedMotion ? 0 : MathUtils.damp(head.angles.x, pitch, 10, Math.min(delta, 0.1)),
        reducedMotion ? 0 : MathUtils.damp(head.angles.y, yaw, 10, Math.min(delta, 0.1)),
        0,
      );
      head.offset.setFromEuler(head.angles);
      head.object.quaternion.copy(head.rest).multiply(head.offset);
    }
    if (rightArm.shoulder && rightArm.shoulderRest && rightArm.wrist && rightArm.wristRest) {
      const gesture = wave.current;
      if (reducedMotion) gesture.active = false;
      if (gesture.active) {
        gesture.elapsed += Math.min(delta, 0.1);
        const t = gesture.elapsed;
        const smooth = (value: number) => { const p = MathUtils.clamp(value, 0, 1); return p * p * (3 - 2 * p); };
        const lift = t < 0.5 ? smooth(t / 0.5) : t < 1.9 ? 1 : 1 - smooth((t - 1.9) / 0.5);
        rightArm.angles.set(0, 0, -MathUtils.degToRad(100) * lift);
        rightArm.offset.setFromEuler(rightArm.angles);
        rightArm.shoulder.quaternion.copy(rightArm.shoulderRest).multiply(rightArm.offset);
        const sway = t >= 0.5 && t < 1.9 ? Math.sin((t - 0.5) * Math.PI * 5) * MathUtils.degToRad(22) : 0;
        rightArm.angles.set(0, sway, 0);
        rightArm.offset.setFromEuler(rightArm.angles);
        rightArm.wrist.quaternion.copy(rightArm.wristRest).multiply(rightArm.offset);
        if (t >= 2.4) gesture.active = false;
      } else {
        rightArm.shoulder.quaternion.copy(rightArm.shoulderRest);
        rightArm.wrist.quaternion.copy(rightArm.wristRest);
      }
    }
    for (const graphic of graphics) {
      const targetIndex = graphic.morphTargetDictionary?.[expression];
      graphic.morphTargetInfluences?.forEach((weight, index, weights) => {
        const target = expressionActive && index === targetIndex ? 1 : 0;
        weights[index] = reducedMotion ? target : MathUtils.damp(weight, target, 12, Math.min(delta, 0.1));
      });
    }
  });

  useEffect(() => {
    if (interaction === 0 || reducedMotion) return;
    const action = actions.Astra_Welcome;
    if (!action) return;
    action.reset().setLoop(LoopOnce, 1).fadeIn(0.2).play();
    const finished = (event: { action: typeof action }) => {
      if (event.action === action) action.fadeOut(0.35);
    };
    mixer.addEventListener("finished", finished);
    return () => {
      mixer.removeEventListener("finished", finished);
      action.stop();
    };
  }, [interaction, reducedMotion, actions, mixer]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={0.62} position={[0, -1.65, 0]} />
    </group>
  );
}

useGLTF.preload("/astra_robot.glb");
