"use client"

import Image from "next/image"
import Link from "next/link"
import { FaPinterestP } from "react-icons/fa"
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
   TYPES
========================================================= */

interface HeaderProps {
  posts?: {
    title: string
    slug: string
    category?: string
    excerpt?: string
    tags?: string[]
    searchContent?: string
  }[]
}

/* =========================================================
   NAVIGATION
========================================================= */

const navLinks = [
  { href: "/", label: "Home", external: false },
  { href: "/blog", label: "Blog", external: false },
  {
    href: "https://a.co/d/0i54mdf3",
    label: "Storefront",
    external: true,
  },
  { href: "/about", label: "About", external: false },
  { href: "/contact", label: "Contact", external: false },
]

const categories = [
  "Fashion",
  "Outfit Ideas",
  "Home Decor",
  "Beauty",
  "Self Care",
]

/* =========================================================
   HEADER
========================================================= */

export function Header({
  posts,
}: HeaderProps) {

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

                  return link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        relative
                        text-[12px]
                        font-medium
                        uppercase
                        tracking-[0.22em]
                        text-muted-foreground
                        transition-all
                        duration-300
                        hover:text-foreground
                      "
                    >
                      {link.label}
                    </a>
                  ) : (
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
                          pathname === link.href
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {link.label}

                      {pathname === link.href && (
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
  <FaPinterestP className="h-5 w-5" />
</Link>

            </div>

          </div>

        </div>

      </motion.header>

      {/* MOBILE MENU PANEL */}

      {isMenuOpen && (

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            fixed
            top-[88px]
            left-0
            z-40
            w-full
            border-b
            border-border
            bg-background
            px-6
            py-8
            shadow-2xl
            md:hidden
          "
        >

          <nav
            className="
              flex
              flex-col
              gap-6
            "
          >

            {navLinks.map((link) => {

              const isActive =
                pathname === link.href

              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-muted-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    text-lg
                    font-medium
                    ${
                      pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}

          </nav>

          {/* CATEGORIES */}

          <div
            className="
              mt-8
              border-t
              border-border
              pt-6
            "
          >

            <p
              className="
                mb-4
                text-xs
                uppercase
                tracking-[0.25em]
                text-muted-foreground
              "
            >
              Categories
            </p>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              {categories.map((category) => (

                <span
                  key={category}
                  className="
                    rounded-full
                    border
                    border-border
                    px-4
                    py-2
                    text-sm
                    text-muted-foreground
                  "
                >
                  {category}
                </span>

              ))}

            </div>

          </div>

        </motion.div>

      )}

      {/* SEARCH DIALOG */}

      <SearchDialog
        open={isSearchOpen}
        onClose={() =>
          setIsSearchOpen(false)
        }
        posts={posts || []}
      />

    </>
  )
}
