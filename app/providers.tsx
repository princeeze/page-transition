"use client";

import { motion, useAnimate } from "framer-motion";
import { TransitionRouter } from "next-transition-router";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [columnContainerRef, animateColumnContainer] = useAnimate();
  const [opacityRef, animateOpacity] = useAnimate();
  const colNo = 7;

  return (
    <TransitionRouter
      auto={true}
      enter={(next) => {
        const columnAnimation = [...Array(colNo)].map((_, i) =>
          animateColumnContainer(
            `div:nth-child(${i + 1})`,
            { top: ["0dvh", "100dvh"] },
            {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
              delay: (colNo - 1 - i) * 0.05,
            }
          )
        );

        const opacityAnimation = animateOpacity(
          opacityRef.current,
          {
            opacity: [0.5, 0],
          },
          { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        );

        Promise.all([...columnAnimation, opacityAnimation]).then(next);
      }}
      leave={(next) => {
        const columnAnimation = [...Array(colNo)].map((_, i) =>
          animateColumnContainer(
            `div:nth-child(${i + 1})`,
            { top: ["-100dvh", "0dvh"] },
            {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
              delay: (colNo - 1 - i) * 0.05,
            }
          )
        );

        const opacityAnimation = animateOpacity(
          opacityRef.current,
          {
            opacity: [0, 0.5],
          },
          { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        );

        Promise.all([...columnAnimation, opacityAnimation]).then(next);
      }}
    >
      <div
        ref={columnContainerRef}
        className="pointer-events-none fixed top-[0dvh] z-50 flex h-[100dvh] w-screen"
      >
        {[...Array(colNo)].map((_, i) => (
          <motion.div
            key={i}
            className="pointer-events-none relative top-[-100dvh] h-full w-full bg-foreground"
          ></motion.div>
        ))}
      </div>
      <motion.div
        ref={opacityRef}
        className="pointer-events-none fixed top-[0dvh] z-50 flex h-[100dvh] w-screen bg-foreground"
        initial={{ opacity: 0 }}
      ></motion.div>
      {children}
    </TransitionRouter>
  );
}
