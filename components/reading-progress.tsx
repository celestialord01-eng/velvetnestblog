"use client"

import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion"

/* =========================================================
   READING PROGRESS
========================================================= */

export function ReadingProgress() {

  const {
    scrollYProgress,
  } = useScroll()

  /* SMOOTHER ANIMATION */

  const scaleX =
    useSpring(
      scrollYProgress,
      {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
      }
    )

  return (

    <>
      {/* BACKGROUND TRACK */}

      <div
        className="
          fixed
          left-0
          top-0
          z-[9998]
          h-[2px]
          w-full
          bg-[#efe8df]/70
          backdrop-blur-sm
        "
      />

      {/* PROGRESS BAR */}

      <motion.div
        className="
          fixed
          left-0
          top-0
          z-[9999]
          h-[2px]
          origin-left
          bg-gradient-to-r
          from-[#b79b84]
          via-[#8f7763]
          to-[#5c4c40]
          shadow-[0_0_12px_rgba(183,155,132,0.35)]
        "
        style={{
          scaleX,
          width: "100%",
        }}
      />

    </>
  )
}
