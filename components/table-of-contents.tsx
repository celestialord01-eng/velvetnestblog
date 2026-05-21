"use client"

import Link from "next/link"

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

          {items.map((item) => (

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
                  block
                  transition-all
                  duration-300
                  hover:translate-x-1
                  ${
                    item.level === "h3"
                      ? "text-[0.95rem] text-[#7b6f66]"
                      : "text-[1rem] text-[#5d524a]"
                  }
                `}
              >

                <span
                  className="
                    leading-7
                    hover:text-foreground
                  "
                >
                  {item.text}
                </span>

              </Link>

            </li>

          ))}

        </ul>

      </nav>

    </div>
  )
}
