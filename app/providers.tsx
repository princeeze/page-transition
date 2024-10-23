"use client";

import { motion, useAnimate } from "framer-motion";
import { TransitionRouter } from "next-transition-router";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [sliderRef, animateSlider] = useAnimate();
  const [perspectiveRef, animatePerspective] = useAnimate();
  const [opacityRef, animateOpacity] = useAnimate();

  return (
    <TransitionRouter
      auto={true}
      enter={(next) => {
        const animations = [
          animateSlider(sliderRef.current, { top: "100dvh" }, { duration: 0 }),
          animateOpacity(
            opacityRef.current,
            { opacity: [0, 1] },
            { duration: 0.3 }
          ),
          animatePerspective(
            perspectiveRef.current,
            { scale: [1], y: [0], opacity: [1] },
            { duration: 0 }
          ),
        ];

        Promise.all(animations).then(next);
      }}
      leave={(next) => {
        const animations = [
          animateSlider(
            sliderRef.current,
            { top: ["100dvh", "0dvh"] },
            { duration: 1, ease: [0.76, 0, 0.24, 1] }
          ),
          animatePerspective(
            perspectiveRef.current,
            { scale: [1, 0.8], y: [0, "-30dvh"], opacity: [1, 0.4] },
            { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          ),
        ];

        Promise.all(animations).then(next);
      }}
    >
      <div className="bg-foreground">
        <motion.div
          ref={sliderRef}
          className="fixed top-0 z-10 h-[100dvh] w-full bg-background"
          initial={{ top: "100dvh" }}
        />
        <div ref={perspectiveRef} className="bg-background">
          <div ref={opacityRef}>{children}</div>
        </div>
      </div>
    </TransitionRouter>
  );
}
