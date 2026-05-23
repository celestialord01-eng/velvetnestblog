"use client"

import Image from "next/image"
import Link from "next/link"

import {
  usePathname,
} from "next/navigation"

import {
  useEffect,
  useState,
} from "react"

import {
  Menu,
  Search,
  X,
} from "lucide-react"

import { motion } from "framer-motion"

import { SearchDialog } from "@/components/search-dialog"

/* =========================================================
   NAVIGATION
========================================================= */

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  {
    href: "/amazon-finds",
    label: "Amazon Finds",
  },
  { href: "/about", label: "About" },
  {
    href: "/contact",
    label: "Contact",
  },
]

const categories = [
  "Fashion",
  "Outfit Ideas",
  "Home Decor",
  "Beauty",
  "Self Care",
]

/* =========================================================
   TEMP SEARCH POSTS
========================================================= */

const searchPosts = [
  {
    title: "Cute Summer Outfit Ideas",
    slug: "cute-summer-outfit-ideas",
    category: "Fashion",
  },
  {
    title:
      "Best Skincare Routine for Glowing Skin",
    slug:
      "best-skincare-routine-glowing-skin",
    category: "Beauty",
  },
  {
    title:
      "Budget Home Decor Ideas",
    slug:
      "budget-home-decor-ideas",
    category: "Home Decor",
  },
  {
    title:
      "Sunday Reset Routine",
    slug:
      "sunday-reset-routine",
    category: "Self Care",
  },
]

/* =========================================================
   HEADER
========================================================= */

export function Header() {

  const pathname =
    usePathname()

  const [isMenuOpen, setIsMenuOpen] =
    useState(false)

  const [isSearchOpen, setIsSearchOpen] =
    useState(false)

  const [isScrolled, setIsScrolled] =
    useState(false)

  /* =========================================================
     SCROLL EFFECT
  ========================================================= */

  useEffect(() => {

    const handleScroll = () => {

      setIsScrolled(
        window.scrollY > 20
      )

    }

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )

  }, [])

  /* =========================================================
     CLOSE MENU ON ROUTE CHANGE
  ========================================================= */

  useEffect(() => {

    setIsMenuOpen(false)

  }, [pathname])

  return (

    <>
      <motion.header
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          sticky
          top-0
          z-50
          transition-all
          duration-500
          ${
            isScrolled
              ? `
                border-b
                border-border/60
                bg-background/75
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                backdrop-blur-2xl
              `
              : `
                bg-transparent
              `
          }
        `}
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-5
          "
        >

          {/* MAIN NAV */}

          <div
            className={`
              flex
              items-center
              justify-between
              transition-all
              duration-500
              ${
                isScrolled
                  ? "h-[74px]"
                  : "h-[88px] md:h-[96px]"
              }
            `}
          >

            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setIsMenuOpen(
                  !isMenuOpen
                )
              }
              aria-label="Toggle Menu"
              className="
                text-foreground
                transition
                hover:opacity-70
                md:hidden
              "
            >

              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}

            </button>

            {/* LOGO */}

            <Link
              href="/"
              className="
                transition
                hover:opacity-80
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <Image
                  src="/logo.png"
                  alt="VelvetNest"
                  width={44}
                  height={44}
                  priority
                  className="
                    rounded-full
                    object-cover
                  "
                />

                <div>

                  <h1
                    className={`
                      font-serif
                      font-medium
                      tracking-[-0.04em]
                      text-foreground
                      transition-all
                      duration-500
                      ${
                        isScrolled
                          ? "text-[1.9rem]"
                          : "text-[2.2rem] md:text-[2.5rem]"
                      }
                    `}
                  >
                    VelvetNest
                  </h1>

                  <p
                    className="
                      hidden
                      text-[10px]
                      uppercase
                      tracking-[0.28em]
                      text-muted-foreground
                      md:block
                    "
                  >
                    Fashion • Home • Lifestyle
                  </p>

                </div>

              </div>

            </Link>

            {/* DESKTOP NAV */}

            <nav
              className="
                hidden
                items-center
                gap-8
                md:flex
              "
            >

              {navLinks.map(
                (link) => {

                  const isActive =
                    pathname ===
                    link.href

                  return (

                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        relative
                        text-[12px]
                        font-medium
                        uppercase
                        tracking-[0.22em]
                        transition-all
                        duration-300
                        hover:opacity-70
                        ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >

                      {link.label}

                      {isActive && (

                        <motion.span
                          layoutId="header-active"
                          className="
                            absolute
                            -bottom-2
                            left-0
                            h-[1px]
                            w-full
                            bg-foreground
                          "
                        />

                      )}

                    </Link>

                  )
                }
              )}

            </nav>

            {/* RIGHT */}

            <div
              className="
                flex
                items-center
                gap-5
              "
            >

              {/* SEARCH */}

              <button
                onClick={() =>
                  setIsSearchOpen(true)
                }
                aria-label="Search"
                className="
                  text-muted-foreground
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:text-foreground
                "
              >

                <Search className="h-5 w-5" />

              </button>

              {/* PINTEREST */}

              <Link
                href="https://pinterest.com/velvetnestworld/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="
                  hidden
                  text-muted-foreground
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:text-foreground
                  md:block
                "
              >

                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >

                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />

                </svg>

              </Link>

            </div>

          </div>

          {/* CATEGORY BAR */}

          <div
            className="
              hidden
              border-t
              border-border/70
              py-4
              md:block
            "
          >

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-6
              "
            >

              {categories.map(
                (category) => {

                  const slug =
                    category
                      .toLowerCase()
                      .replace(
                        /\s+/g,
                        "-"
                      )

                  const isActive =
                    pathname ===
                    `/category/${slug}`

                  return (

                    <Link
                      key={category}
                      href={`/category/${slug}`}
                      className={`
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.22em]
                        transition
                        ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >

                      {category}

                    </Link>

                  )
                }
              )}

            </div>

          </div>

        </div>

        {/* MOBILE MENU */}

        {isMenuOpen && (

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              border-t
              border-border
              bg-background
              md:hidden
            "
          >

            <nav
              className="
                flex
                flex-col
                gap-1
                px-5
                py-6
              "
            >

              {navLinks.map(
                (link) => {

                  const isActive =
                    pathname ===
                    link.href

                  return (

                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        uppercase
                        tracking-[0.16em]
                        transition
                        ${
                          isActive
                            ? "bg-card text-foreground"
                            : "text-muted-foreground hover:bg-card"
                        }
                      `}
                    >

                      {link.label}

                    </Link>

                  )
                }
              )}

              {/* MOBILE CATEGORIES */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                "
              >

                {categories.map(
                  (category) => {

                    const slug =
                      category
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          "-"
                        )

                    return (

                      <Link
                        key={category}
                        href={`/category/${slug}`}
                        className="
                          rounded-full
                          border
                          border-border
                          px-4
                          py-2
                          text-[10px]
                          uppercase
                          tracking-[0.18em]
                          text-muted-foreground
                        "
                      >

                        {category}

                      </Link>

                    )
                  }
                )}

              </div>

            </nav>

          </motion.div>

        )}

      </motion.header>

      {/* SEARCH DIALOG */}

      <SearchDialog
        open={isSearchOpen}
        onClose={() =>
          setIsSearchOpen(false)
        }
        posts={searchPosts}
      />

    </>
  )
    }
