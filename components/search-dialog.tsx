"use client"
import {
  calculateSearchScore
} from "@/lib/search"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"

interface SearchItem {
  title: string
  slug: string
  category?: string
  excerpt?: string
  tags?: string[]
  searchContent?: string
}

interface SearchDialogProps {
  open: boolean
  onClose: () => void
  posts?: SearchItem[]
}

export function SearchDialog({
  open,
  onClose,
  posts = [],
}: SearchDialogProps) {

  const [query, setQuery] =
    useState("")

  useEffect(() => {

    function handleKey(
      e: KeyboardEvent
    ) {

      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener(
      "keydown",
      handleKey
    )

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      )

  }, [onClose])
const filteredPosts =
  useMemo(() => {

    if (!query.trim()) {
      return posts.slice(0, 4)
    }

    return posts
  .map((post) => ({
    ...post,
    score: calculateSearchScore(
      post,
      query
    ),
  }))
  .filter(
    (post) => post.score > 0
  )
  .sort(
    (a, b) => b.score - a.score
  )
  .slice(0, 4)

  }, [query, posts])

  if (!open) {
    return null
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[99999]
        bg-black/30
        backdrop-blur-xl
        animate-fade-in
      "
    >

      {/* OVERLAY */}

      <button
        onClick={onClose}
        className="absolute inset-0"
      />

      {/* MODAL */}

      <div
        className="
          absolute
          left-1/2
          top-24
          w-[92%]
          max-w-3xl
          -translate-x-1/2
          overflow-hidden
          rounded-[2.5rem]
          border
          border-white/20
          bg-[#f8f5f1]
          shadow-2xl
          animate-fade-up
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#e8dfd5]
            px-6
            py-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Search
              className="
                h-5
                w-5
                text-[#8a7768]
              "
            />

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.24em]
                text-[#8a7768]
              "
            >
              Search VelvetNest
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              transition
              hover:bg-[#ece5dc]
            "
          >

            <X className="h-5 w-5" />

          </button>

        </div>

        {/* INPUT */}

        <div className="px-6 py-5">

          <input
            autoFocus
            type="text"
            placeholder="Search fashion, beauty, decor..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="
              w-full
              border-none
              bg-transparent
              font-serif
              text-[2rem]
              tracking-[-0.04em]
              text-[#1f1a17]
              outline-none
              placeholder:text-[#b4a79b]
            "
          />

        </div>

        {/* RESULTS */}

        <div
          className="
            max-h-[420px]
            overflow-y-auto
            px-4
            pb-5
          "
        >
          
<p
  className="
    px-5
    pb-3
    text-xs
    uppercase
    tracking-[0.22em]
    text-[#8b7d6b]
  "
>
  {filteredPosts.length} Results
</p>
          {filteredPosts.length > 0 ? (

            <div className="space-y-2">

              {filteredPosts.map(
                (post) => (

                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="
                      block
                      rounded-2xl
                      px-5
                      py-4
                      transition-all
                      duration-300
                      hover:bg-[#efe7de]
                    "
                  >

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                        text-[#8b7d6b]
                      "
                    >
                      {post.category ||
                        "Lifestyle"}
                    </p>

                    <h3
                      className="
                        mt-2
                        font-serif
                        text-[1.7rem]
                        leading-[1]
                        tracking-[-0.04em]
                        text-[#1f1a17]
                      "
                    >
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
  <p
    className="
      mt-2
      text-sm
      text-[#6d6259]
      line-clamp-2
    "
  >
    {post.excerpt}
  </p>
)}

                    

                  </Link>

                )
              )}

            </div>

          ) : (

            <div
              className="
                py-20
                text-center
              "
            >

              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.22em]
                  text-[#8b7d6b]
                "
              >
                No articles found
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  )
            }
