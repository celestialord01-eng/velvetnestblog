"use client"

import Link from "next/link"

import {
  useEffect,
  useState,
} from "react"

/* =========================================================
   TYPES
========================================================= */

interface TOCItem {
  text: string
  level: string
  id: string
}

interface TableOfContentsProps {
  items?: TOCItem[]
}

/* =========================================================
   TABLE OF CONTENTS
========================================================= */

export default function TableOfContents({
  items = [],
}: TableOfContentsProps) {

  const [activeId, setActiveId] =
    useState("")

  /* =========================================================
     ACTIVE SECTION TRACKING
  ========================================================= */

  useEffect(() => {

    const headings =
      items.map((item) =>
        document.getElementById(
          item.id
        )
      )

    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                setActiveId(
                  entry.target.id
                )

              }
            }
          )

        },

        {
          rootMargin:
            "-20% 0px -70% 0px",
          threshold: 0,
        }
      )

    headings.forEach(
      (heading) => {

        if (heading) {
          observer.observe(
            heading
          )
        }

      }
    )

    return () => {

      headings.forEach(
        (heading) => {

          if (heading) {
            observer.unobserve(
              heading
            )
          }

        }
      )

    }

  }, [items])

  if (!items.length) {
    return null
  }

  return (

    <div
      className="
        rounded-[2rem]
        border
        border-border
        bg-card/80
        p-7
        backdrop-blur-xl
      "
    >

      {/* LABEL */}

      <p
        className="
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-muted-foreground
        "
      >
        Navigate Article
      </p>

      {/* TITLE */}

      <h3
        className="
          mt-3
          font-serif
          text-[2rem]
          leading-none
          tracking-[-0.04em]
          text-foreground
        "
      >
        Table of Contents
      </h3>

      {/* NAV */}

      <nav className="mt-8">

        <ul className="space-y-5">

          {items.map((item) => {

            const isActive =
              activeId === item.id

            return (

              <li
                key={item.id}
                className={
                  item.level === "h3"
                    ? "ml-5"
                    : ""
                }
              >

                <Link
                  href={`#${item.id}`}
                  className={`
                    group
                    flex
                    items-start
                    gap-3
                    transition-all
                    duration-300
                    hover:translate-x-1
                    ${
                      item.level === "h3"
                        ? "text-[0.95rem]"
                        : "text-[1rem]"
                    }
                    ${
                      isActive
                        ? "text-foreground"
                        : "text-[#7b6f66]"
                    }
                  `}
                >

                  {/* ACTIVE LINE */}

                  <span
                    className={`
                      mt-[11px]
                      h-[1px]
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? `
                            w-8
                            bg-foreground
                          `
                          : `
                            w-4
                            bg-[#c8b7a7]
                            group-hover:w-6
                          `
                      }
                    `}
                  />

                  {/* TEXT */}

                  <span
                    className="
                      leading-7
                    "
                  >
                    {item.text}
                  </span>

                </Link>

              </li>

            )
          })}

        </ul>

      </nav>

    </div>
  )
}
