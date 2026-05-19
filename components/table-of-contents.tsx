"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"

interface TOCItem {
  text: string
  id: string
  level: string
}

export default function TableOfContents({
  toc,
}: {
  toc: TOCItem[]
}) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-30% 0px -60% 0px",
      }
    )

    headings.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [])

  return (
    <div className="rounded-3xl border border-border bg-secondary/30 p-6 lg:sticky lg:top-24">
      <h3 className="mb-5 text-lg font-semibold tracking-tight">
        Table of Contents
      </h3>

      <ul className="space-y-1">
        {toc.map((item) => (
          <li
            key={item.id}
            className={item.level === "h3" ? "ml-4" : ""}
          >
            <a
              href={`#${item.id}`}
              className={clsx(
                "block rounded-xl px-3 py-2.5 text-sm leading-6 transition-all duration-200",
                activeId === item.id
                  ? "bg-background font-medium text-foreground shadow-sm"
                  : "text-foreground/70 hover:bg-background hover:text-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
        }
