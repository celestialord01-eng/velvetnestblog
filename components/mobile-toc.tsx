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

interface MobileTOCProps {
  items?: TOCItem[]
}

/* =========================================================
   MOBILE TOC
========================================================= */

export default function MobileTOC({
  items = [],
}: MobileTOCProps) {

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
        p-6
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
        Quick Navigation
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
        Contents
      </h3>

      {/* LIST */}

      <ul className="mt-7 space-y-4">

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

    </div>
  )
}
