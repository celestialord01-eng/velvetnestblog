"use client"

import Link from "next/link"

interface TOCItem {
  text: string
  level: string
  id: string
}

interface MobileTOCProps {
  items?: TOCItem[]
}

export default function MobileTOC({
  items = [],
}: MobileTOCProps) {

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
        p-5
      "
    >

      <h3
        className="
          mb-4
          text-base
          font-semibold
        "
      >
        Contents
      </h3>

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
                text-[#6b6258]
              "
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
