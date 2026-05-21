"use client"

import Link from "next/link"

interface TOCItem {
  text: string
  level: string
  id: string
}

interface TableOfContentsProps {
  items?: TOCItem[]
}

export default function TableOfContents({
  items = [],
}: TableOfContentsProps) {

  if (!items.length) {
    return null
  }

  return (

    <div
      className="
        rounded-3xl
        border
        border-[#ece6de]
        bg-white
        p-6
        shadow-sm
      "
    >

      <h3
        className="
          mb-5
          text-lg
          font-semibold
          text-[#2c2520]
        "
      >
        Table of Contents
      </h3>

      <nav>

        <ul className="space-y-3">

          {items.map((item) => (

            <li
              key={item.id}
              className={
                item.level === "h3"
                  ? "ml-4"
                  : ""
              }
            >

              <Link
                href={`#${item.id}`}
                className="
                  text-sm
                  leading-6
                  text-[#6b6258]
                  transition-colors
                  hover:text-[#2c2520]
                "
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
                }
