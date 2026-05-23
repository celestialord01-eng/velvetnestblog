"use client"

import {
  AnimatePresence,
  motion,
} from "framer-motion"

import {
  usePathname,
} from "next/navigation"

interface Props {
  children: React.ReactNode
}

/* =========================================================
   PAGE TRANSITION
========================================================= */

export function PageTransition({
  children,
}: Props) {

  const pathname =
    usePathname()

  return (

    <AnimatePresence
      mode="wait"
    >

      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 12,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        {children}

      </motion.div>

    </AnimatePresence>
  )
}
