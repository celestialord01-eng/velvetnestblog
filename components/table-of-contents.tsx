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
     SCROLL SPY
  ========================================================= */

  useEffect(() => {

    const headings =
      items.map((item) =>
        document.getElementById(item.id)
      )

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {
              setActiveId(
                entry.target.id
              )
            }

          })
        },
        {
          rootMargin:
            "-30% 0px -55% 0px",
          threshold: 0.1,
        }
      )

    headings.forEach((heading) => {

      if (heading) {
        observer.observe(heading)
      }

    })

    return () => {

      headings.forEach((heading) => {

        if (heading) {
          observer.unobserve(heading)
        }

      })

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
        shadow-[0_10px_40px_rgba(0,0,0,0.03)]
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
                    relative
                    block
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
                        : "text-[#6f635b]"
                    }
                  `}
                >

                  {/* ACTIVE LINE */}

                  <span
                    className={`
                      absolute
                      -left-4
                      top-[0.7rem]
                      h-[1px]
                      bg-[#9f8873]
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "w-2 opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />

                  {/* TEXT */}

                  <span
                    className={`
                      leading-7
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "font-medium text-[#2a2420]"
                          : "group-hover:text-foreground"
                      }
                    `}
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
