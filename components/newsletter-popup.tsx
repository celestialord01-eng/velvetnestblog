"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

/* =========================================================
   NEWSLETTER POPUP
========================================================= */

export function NewsletterPopup() {

  const [isOpen, setIsOpen] =
    useState(false)

  const [email, setEmail] =
    useState("")

  const [isSubmitted, setIsSubmitted] =
    useState(false)

  /* SHOW POPUP */

  useEffect(() => {

    const hasSeenPopup =
      localStorage.getItem(
        "velvetnest-popup-seen"
      )

    if (!hasSeenPopup) {

      const timer =
        setTimeout(() => {
          setIsOpen(true)
        }, 5000)

      return () =>
        clearTimeout(timer)
    }

  }, [])

  /* CLOSE */

  const handleClose = () => {

    setIsOpen(false)

    localStorage.setItem(
      "velvetnest-popup-seen",
      "true"
    )
  }

  /* SUBMIT */

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setIsSubmitted(true)

    setTimeout(() => {
      handleClose()
    }, 2200)
  }

  return (

    <AnimatePresence>

      {isOpen && (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/40
            p-5
            backdrop-blur-md
          "
        >

          {/* MODAL */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="
              relative
              w-full
              max-w-2xl
              overflow-hidden
              rounded-[2.5rem]
              border
              border-white/20
              bg-[#f8f4ef]
              shadow-[0_20px_80px_rgba(0,0,0,0.12)]
            "
          >

            {/* CLOSE */}

            <button
              onClick={handleClose}
              aria-label="Close Popup"
              className="
                absolute
                right-6
                top-6
                z-20
                text-[#7a6d64]
                transition
                hover:text-black
              "
            >

              <X className="h-5 w-5" />

            </button>

            {!isSubmitted ? (

              <div
                className="
                  grid
                  lg:grid-cols-[0.9fr_1.1fr]
                "
              >

                {/* IMAGE SIDE */}

                <div
                  className="
                    hidden
                    bg-[#e9dfd3]
                    lg:block
                  "
                >

                  <div
                    className="
                      h-full
                      w-full
                      bg-[url('/newsletter-popup.jpg')]
                      bg-cover
                      bg-center
                    "
                  />

                </div>

                {/* CONTENT */}

                <div
                  className="
                    p-8
                    md:p-12
                  "
                >

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.28em]
                      text-[#8d7b6b]
                    "
                  >
                    Join The Community
                  </p>

                  <h2
                    className="
                      mt-5
                      font-serif
                      text-[3rem]
                      leading-[0.92]
                      tracking-[-0.05em]
                      text-[#1f1a17]
                    "
                  >
                    Curated inspiration for beautiful living.
                  </h2>

                  <p
                    className="
                      mt-6
                      text-[1.05rem]
                      leading-8
                      text-[#685d55]
                    "
                  >
                    Get exclusive fashion inspiration,
                    elevated home decor ideas,
                    beauty favorites,
                    and curated Amazon finds delivered weekly.
                  </p>

                  {/* FORM */}

                  <form
                    onSubmit={handleSubmit}
                    className="
                      mt-8
                      space-y-4
                    "
                  >

                    <Input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      className="
                        h-14
                        rounded-full
                        border-[#ddd1c5]
                        bg-white
                        px-6
                        text-base
                        shadow-none
                        focus-visible:ring-1
                        focus-visible:ring-[#b79d84]
                      "
                    />

                    <Button
                      type="submit"
                      className="
                        h-14
                        w-full
                        rounded-full
                        bg-[#2c2623]
                        text-[12px]
                        uppercase
                        tracking-[0.18em]
                        text-white
                        hover:bg-black
                      "
                    >
                      Subscribe Now
                    </Button>

                  </form>

                  {/* PRIVACY */}

                  <p
                    className="
                      mt-5
                      text-xs
                      leading-6
                      text-[#8d8177]
                    "
                  >
                    No spam. Unsubscribe anytime.

                    {" "}

                    <a
                      href="/privacy-policy"
                      className="
                        underline
                        underline-offset-4
                      "
                    >
                      Privacy Policy
                    </a>

                  </p>

                  {/* SKIP */}

                  <button
                    onClick={handleClose}
                    className="
                      mt-6
                      text-sm
                      text-[#7d7167]
                      transition
                      hover:text-black
                    "
                  >
                    No thanks, maybe later
                  </button>

                </div>

              </div>

            ) : (

              /* SUCCESS */

              <div
                className="
                  px-8
                  py-24
                  text-center
                "
              >

                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[#e8ddd2]
                  "
                >

                  <svg
                    className="
                      h-7
                      w-7
                      text-[#5d4d40]
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />

                  </svg>

                </div>

                <h2
                  className="
                    mt-6
                    font-serif
                    text-[3rem]
                    tracking-[-0.05em]
                    text-[#1f1a17]
                  "
                >
                  Welcome to VelvetNest
                </h2>

                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-md
                    text-[1.05rem]
                    leading-8
                    text-[#685d55]
                  "
                >
                  Your first curated inspiration email
                  will arrive soon.
                </p>

              </div>

            )}

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  )
          }
