"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface TOCItem {
  text: string
  id: string
  level: string
}

export default function MobileTOC({
  toc,
}: {
  toc: TOCItem[]
}) {
  return (
    <div className="mb-8 lg:hidden">
      <Sheet>
        <SheetTrigger className="rounded-full border border-border bg-secondary px-5 py-2 text-sm font-medium">
          Contents
        </SheetTrigger>

        <SheetContent side="left">
          <div className="mt-10">
            <h3 className="mb-6 text-lg font-semibold">
              Table of Contents
            </h3>

            <ul className="space-y-3">
              {toc.map((item) => (
                <li
                  key={item.id}
                  className={item.level === "h3" ? "ml-4" : ""}
                >
                  <a
                    href={`#${item.id}`}
                    className="text-sm leading-6 text-foreground/70"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
