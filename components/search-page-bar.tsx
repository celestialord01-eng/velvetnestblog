"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function SearchPageBar({
  initialQuery,
}: {
  initialQuery: string
}) {

  const [query, setQuery] =
    useState(initialQuery)

  const router = useRouter()

  return (

    <form
      onSubmit={(e) => {

        e.preventDefault()

        router.push(
          `/search?q=${encodeURIComponent(
            query
          )}`
        )

      }}
      className="mt-8"
    >

      <input
        type="text"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search articles..."
        className="
          w-full
          border
          border-border
          bg-transparent
          px-6
          py-5
          text-xl
          outline-none
        "
      />

    </form>

  )

}
