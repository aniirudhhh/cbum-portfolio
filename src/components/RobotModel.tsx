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
  expression?: "happy" | "sad" | "surprised" | "heart";
  expressionActive?: boolean;
  reducedMotion?: boolean;
  headLook?: [number, number];
};

export function RobotModel({ url = "/astra_robot.glb", interaction = 0, expression = "happy", expressionActive = false, reducedMotion = false, headLook = [0, 0], ...props }: RobotModelProps) {
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
    clip.tracks.filter((track) => !track.name.includes("morphTargetInfluences") && !track.name.startsWith("Astra_Root.") && !track.name.startsWith("Head_Control.")),
  )), [animations]);
  const { actions, mixer } = useAnimations(gestures, group);
  const head = useMemo(() => {
    const object = scene.getObjectByName("Head_Control");
    return { object, rest: object?.quaternion.clone(), angles: new Euler(), offset: new Quaternion() };
  }, [scene]);

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
