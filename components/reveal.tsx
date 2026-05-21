"use client"

import {
  motion,
} from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
}

/* =========================================================
   REVEAL ANIMATION
========================================================= */

export function Reveal({
  children,
  delay = 0,
  y = 40,
}: RevealProps) {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >

      {children}

    </motion.div>
  )
}
