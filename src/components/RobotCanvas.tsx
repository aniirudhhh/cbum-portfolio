"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { ACESFilmicToneMapping, Group, MathUtils } from "three";
import { RobotModel } from "./RobotModel";
import { answerPortfolioQuestion } from "@/lib/portfolio-answer";

const greetings = [
  { expression: "happy", text: "Hey there! So happy you stopped by." },
  { expression: "surprised", text: "Oh! A visitor! Come explore Shivam’s work." },
  { expression: "heart", text: "Sending a little robot love. Thanks for being here!" },
  { expression: "sad", text: "Leaving already? I’ll miss you. Come say hello again!" },
] as const;

const defaultRotation: [number, number, number] = [0.04, -0.25, 0];

function RobotRotation({ rotation, reducedMotion, children }: { rotation: [number, number, number]; reducedMotion: boolean; children: ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const current = group.current.rotation;
    if (reducedMotion) current.set(...rotation);
    else {
      const step = Math.min(delta, 0.1);
      current.x = MathUtils.damp(current.x, rotation[0], 10, step);
      current.y = MathUtils.damp(current.y, rotation[1], 10, step);
      current.z = MathUtils.damp(current.z, rotation[2], 10, step);
    }
  });
  return <group ref={group} rotation={defaultRotation}>{children}</group>;
}

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function RobotCanvas({ url = "/astra_robot.glb" }: { url?: string }) {
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const [interaction, setInteraction] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(-1);
  const [idleExpressionIndex, setIdleExpressionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [draft, setDraft] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [inputClosing, setInputClosing] = useState(false);
  const [thinking, setThinking] = useState(false);
  const requestVersion = useRef(0);
  const questionControl = useRef<HTMLDivElement>(null);
  const [messageKind, setMessageKind] = useState<"greeting" | "answer">("greeting");
  const [speaking, setSpeaking] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [rotation, setRotation] = useState<[number, number, number]>(defaultRotation);
  const drag = useRef<{ pointerId: number; x: number; y: number; rotation: [number, number, number]; moved: boolean } | null>(null);
  const [headLook, setHeadLook] = useState<[number, number]>([0, 0]);
  const greeting = greetings[Math.max(0, greetingIndex)];

  useEffect(() => {
    if (!speaking || thinking) return;
    const timeout = window.setTimeout(() => setSpeaking(false), messageKind === "answer" ? 14000 : 5500);
    return () => window.clearTimeout(timeout);
  }, [speaking, interaction, messageKind, thinking]);

  useEffect(() => {
    if (!inputOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !questionControl.current?.contains(event.target)) setInputClosing(true);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [inputOpen]);

  useEffect(() => {
    if (!inputClosing) return;
    const timeout = window.setTimeout(() => { setInputOpen(false); setInputClosing(false); }, reducedMotion ? 0 : 240);
    return () => window.clearTimeout(timeout);
  }, [inputClosing, reducedMotion]);

  useEffect(() => {
    if (speaking || minimized || reducedMotion) return;
    let timeout: number;
    function scheduleExpression() {
      timeout = window.setTimeout(() => {
        setIdleExpressionIndex((previous) => {
          const choices = greetings.map((_, index) => index).filter((index) => index !== previous);
          return choices[Math.floor(Math.random() * choices.length)];
        });
        scheduleExpression();
      }, 3000 + Math.random() * 3000);
    }
    scheduleExpression();
    return () => window.clearTimeout(timeout);
  }, [speaking, minimized, reducedMotion]);

  function greet() {
    requestVersion.current += 1;
    setThinking(false);
    setMessageKind("greeting");
    // Pick any expression except the previous one, with equal probability.
    const choices = greetings.map((_, index) => index).filter((index) => index !== greetingIndex);
    setGreetingIndex(choices[Math.floor(Math.random() * choices.length)]);
    setInteraction((value) => value + 1);
    setSpeaking(true);
  }

  async function askQuestion() {
    if (!draft.trim() || thinking) return;
    const question = draft.trim();
    const version = ++requestVersion.current;
    setMessageKind("answer");
    setAnswer("Thinking about your question…");
    setThinking(true);
    setInputClosing(true);
    setInteraction((value) => value + 1);
    setSpeaking(true);
    try {
      const response = await fetch("/api/robot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }), signal: AbortSignal.timeout(18000) });
      if (!response.ok) throw new Error("Request failed");
      const result = await response.json();
      if (version === requestVersion.current) setAnswer(typeof result.answer === "string" ? result.answer : answerPortfolioQuestion(question));
    } catch {
      if (version === requestVersion.current) setAnswer(answerPortfolioQuestion(question));
    } finally {
      if (version === requestVersion.current) { setThinking(false); setInteraction((value) => value + 1); }
    }
  }

  return (
    <aside className={`robot-companion ${minimized ? "is-minimized" : ""}`} aria-label="Interactive robot companion">
      {minimized ? (
        <button className="robot-restore" onClick={() => setMinimized(false)} aria-label="Show robot companion">✦</button>
      ) : (
        <>
          <div className="robot-speech" role="status" aria-live="polite" data-visible={speaking}>
            {speaking && interaction > 0 ? (messageKind === "answer" ? answer : greeting.text) : ""}
          </div>
          <button className="robot-minimize" onClick={() => { setMinimized(true); setSpeaking(false); setInputOpen(false); }} aria-label="Minimize robot companion">−</button>
          <div className="robot-stage" role="button" tabIndex={0} aria-label="Click robot for an expression and greeting" title="Hover to look around. Drag to rotate, or use the left and right arrow keys."
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            setHeadLook([0, 0]);
            drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rotation, moved: false };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const start = drag.current;
            if (event.buttons === 0) {
              if (event.pointerType !== "mouse" || reducedMotion) return;
              const bounds = event.currentTarget.getBoundingClientRect();
              const x = MathUtils.clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1);
              const y = MathUtils.clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1);
              setHeadLook([y * 0.18, x * 0.4]);
              return;
            }
            if (!start || start.pointerId !== event.pointerId) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (Math.hypot(dx, dy) > 6) start.moved = true;
            if (start.moved) setRotation([
              Math.max(-0.3, Math.min(0.3, start.rotation[0] + dy * 0.006)),
              start.rotation[1] + dx * 0.015,
              0,
            ]);
          }}
          onPointerUp={() => setRotation(defaultRotation)}
          onPointerLeave={() => { setRotation(defaultRotation); setHeadLook([0, 0]); }}
          onLostPointerCapture={() => setRotation(defaultRotation)}
          onBlur={() => { setRotation(defaultRotation); setHeadLook([0, 0]); }}
          onPointerCancel={() => {
            if (drag.current) drag.current.moved = true;
            setHeadLook([0, 0]);
            setRotation(defaultRotation);
          }}
          onClick={(event) => {
            if (event.detail === 0 || !drag.current?.moved) greet();
            drag.current = null;
          }} onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              setRotation(([x, y, z]) => [x, y + (event.key === "ArrowLeft" ? -0.2 : 0.2), z]);
            }
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              if (!event.repeat) greet();
            }
          }}>
            <div className="robot-halo" />
            <Suspense fallback={<span className="robot-loading">Waking up…</span>}>
              <Canvas frameloop={reducedMotion ? "demand" : "always"} dpr={[1, 1.5]} camera={{ position: [0, 0.2, 5.7], fov: 32 }} gl={{ alpha: true, antialias: true, toneMapping: ACESFilmicToneMapping }}>
                <ambientLight intensity={0.45} />
                <directionalLight position={[3, 5, 4]} intensity={2.8} color="#fff4e5" />
                <directionalLight position={[-4, 2, 2]} intensity={1.3} color="#c0edff" />
                <directionalLight position={[1, 3, -4]} intensity={2.5} color="#d3fff0" />
                <Environment resolution={64}>
                  <Lightformer intensity={3} position={[0, 4, 3]} scale={[5, 3, 1]} />
                  <Lightformer intensity={2} position={[-4, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[2, 5, 1]} />
                </Environment>
                <RobotRotation rotation={rotation} reducedMotion={reducedMotion}>
                  <Float enabled={!reducedMotion} speed={1.8} rotationIntensity={0.08} floatIntensity={0.16} floatingRange={[-0.04, 0.04]}>
                    <RobotModel headLook={headLook} url={url} position={[0, 0.2, 0]} interaction={interaction} expression={thinking ? "surprised" : speaking ? (messageKind === "answer" ? "happy" : greeting.expression) : greetings[idleExpressionIndex].expression} expressionActive={speaking || !reducedMotion} reducedMotion={reducedMotion} />
                  </Float>
                </RobotRotation>
                <ContactShadows frames={1} position={[0, -1.2, 0]} opacity={0.35} scale={5} blur={2.8} far={3} resolution={128} color="#173b35" />
              </Canvas>
            </Suspense>
          </div>
          <div ref={questionControl} className="robot-question-control" data-open={inputOpen} data-closing={inputClosing}>
            {inputOpen ? (
              <form className="robot-question-form" onSubmit={(event) => { event.preventDefault(); askQuestion(); }}>
                <input autoFocus aria-label="Ask about Shivam" placeholder="Ask about me…" maxLength={300} value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => { if (event.key === "Escape") setInputClosing(true); }} />
                <button type="submit" disabled={!draft.trim() || thinking} aria-label="Send question">{thinking ? "Wait…" : "Ask"}</button>
              </form>
            ) : (
              <button type="button" className="robot-greet robot-about" onClick={() => { setInputClosing(false); setInputOpen(true); }} aria-expanded={inputOpen}>
                <span>Ask about me</span>
              </button>
            )}
          </div>
        </>
      )}
    </aside>
  );
}
