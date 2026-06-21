import Link from "next/link"
import Image from "next/image"

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
  searchParams: Promise<{ q?: string }>
}) {

  const params = await searchParams

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

  const results =
    query.trim()
      ? processedPosts
          .map((post: any) => ({
            ...post,
            score:
              calculateSearchScore(
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
          Search Results for:
          {" "}
          "{query}"
        </h1>

        <p
          className="
            mt-4
            text-muted-foreground
          "
        >
          {results.length} articles found
        </p>

        <div
  className="
    mt-16
    grid
    gap-10
    md:grid-cols-2
  "
>
  {results.map((post: any) => (

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
      </main>

      <Footer />
    </div>
  )
      }
