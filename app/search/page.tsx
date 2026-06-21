import Link from "next/link"
import Image from "next/image"
import { SearchPageBar }
from "@/components/search-page-bar"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import {
  calculateSearchScore,
  extractPortableText,
} from "@/lib/search"

export const revalidate = 60

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
  q?: string
  category?: string
}>
}) {

  const params = await searchParams
const selectedCategory =
  params.category || "All"
  const query = params.q || ""

  const posts = await client.fetch(`
    *[_type == "post"]{
      _id,
      title,
      excerpt,
      body,
      mainImage,
      publishedAt,
      "slug": slug.current,
      "category": category->title,
      tags
    }
  `)

  const processedPosts =
    posts.map((post: any) => ({
      ...post,
      searchContent:
        extractPortableText(post.body),
    }))
  const categories = [
  "All",
  "Fashion",
  "Outfit Ideas",
  "Home Decor",
  "Beauty",
  "Self Care",
]

  const results =
  query.trim()
    ? processedPosts
        .map((post: any) => ({
          ...post,
          score: calculateSearchScore(
            post,
            query
          ),
        }))
        .filter(
          (post: any) =>
            post.score > 0
        )
        .sort(
          (a: any, b: any) =>
            b.score - a.score
        )
    : []

const filteredResults =
  selectedCategory === "All"
    ? results
    : results.filter(
        (post: any) =>
          post.category ===
          selectedCategory
      )

  return (
    <div>
      <Header posts={processedPosts} />

      <main
        className="
          mx-auto
          max-w-7xl
          px-5
          py-24
        "
      >
        <h1
  className="
    font-serif
    text-5xl
    tracking-[-0.04em]
  "
>
  Search Results for "{query}"
</h1>

<SearchPageBar
  initialQuery={query}
/>

<div
  className="
    mt-8
    flex
    flex-wrap
    gap-3
  "
>
  {categories.map((category) => (

    <Link
      key={category}
      href={`/search?q=${encodeURIComponent(
        query
      )}&category=${encodeURIComponent(
        category
      )}`}
      className={`
        rounded-full
        px-5
        py-2
        text-sm
        transition
        ${
          selectedCategory === category
            ? "bg-[#1f1a17] text-white"
            : "border border-[#d6b06f] hover:bg-[#f4efe8]"
        }
      `}
    >
      {category}
    </Link>

  ))}
</div>

        <p
          className="
            mt-4
            text-muted-foreground
          "
        >
          {filteredResults.length} articles found
        </p>

        <div
  className="
    mt-16
    grid
    gap-10
    md:grid-cols-2
  "
>
{filteredResults.map((post: any) => (

    <Link
      key={post._id}
      href={`/blog/${post.slug}`}
      className="
        overflow-hidden
        bg-[#f8f5f1]
      "
    >

      <div
        className="
          relative
          aspect-[4/3]
        "
      >

        <Image
          src={
            post.mainImage
              ? urlFor(post.mainImage)
                  .width(1000)
                  .url()
              : "/placeholder.jpg"
          }
          alt={post.title}
          fill
          className="object-cover"
        />

      </div>

      <div className="p-6">

        <p
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-[#8b7d6b]
          "
        >
          {post.category}
        </p>

        <h2
          className="
            mt-3
            font-serif
            text-3xl
          "
        >
          {post.title}
        </h2>

        <p
          className="
            mt-4
            text-[#6b6057]
            line-clamp-4
          "
        >
          {post.excerpt}
        </p>

      </div>

    </Link>

  ))}
</div>
        {filteredResults.length === 0 && (

  <div
    className="
      py-20
      text-center
    "
  >

    <h2
      className="
        font-serif
        text-3xl
      "
    >
      No articles found
    </h2>

    <p
      className="
        mt-4
        text-muted-foreground
      "
    >
      Try another category or search term.
    </p>

  </div>

)}
      </main>

      <Footer />
    </div>
  )
      }
