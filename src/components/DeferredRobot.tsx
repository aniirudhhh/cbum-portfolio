"use client";

import dynamic from "next/dynamic";

const Robot = dynamic(() => import("./RobotCanvas").then((module) => module.RobotCanvas), { ssr: false });

export function DeferredRobot() {
  return <Robot />;
}
