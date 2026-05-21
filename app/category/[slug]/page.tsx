import type { Metadata } from "next"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { client } from "@/sanity/lib/client"

import {
  categoryPostsQuery,
} from "@/lib/queries"

const categories = [
  "fashion",
  "beauty",
  "home-decor",
  "outfit-ideas",
  "self-care",
]

type Props = {
  params: Promise<{
    slug: string
  }>
}

// SEO METADATA
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const { slug } = await params

  const title =
    slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())

  return {
    title: `${title} | VelvetNest`,
    description: `Explore curated ${title} inspiration, ideas, trends, and timeless lifestyle content from VelvetNest.`,
  }
}

export default async function CategoryPage({
  params,
}: Props) {

  const { slug } = await params

  if (!categories.includes(slug)) {
    notFound()
  }

  const posts = await client.fetch(
    categoryPostsQuery,
    { slug }
  )

  const categoryTitle =
    slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f5f1]">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[#ece6de]">

          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0">

            <Image
              src={`/categories/${slug}.jpg`}
              alt={categoryTitle}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 px-4 py-28">

            <div className="mx-auto max-w-4xl text-center text-white">

              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/80">
                VelvetNest Category
              </p>

              <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
                {categoryTitle}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
                Explore curated inspiration, elegant trends,
                and timeless lifestyle ideas from VelvetNest.
              </p>
            </div>
          </div>
        </section>

        {/* POSTS SECTION */}
        <section className="px-4 py-16">

          <div className="mx-auto max-w-7xl">

            {/* EMPTY STATE */}
            {posts.length === 0 && (

              <div className="rounded-3xl border border-dashed border-[#d8cec2] bg-white p-20 text-center">

                <h2 className="text-3xl font-semibold text-[#2c2520]">
                  No posts yet
                </h2>

                <p className="mt-4 text-[#6b6258]">
                  Articles for this category will appear here soon.
                </p>
              </div>
            )}

            {/* POSTS GRID */}
            {posts.length > 0 && (

              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                {posts.map((post: any) => (

                  <article
                    key={post._id}
                    className="
                      group
                      overflow-hidden
                      rounded-[28px]
                      bg-white
                      shadow-sm
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:shadow-2xl
                    "
                  >

                    {/* IMAGE */}
                    <Link href={`/blog/${post.slug.current}`}>

                      <div className="relative aspect-[4/5] overflow-hidden">

                        <Image
                          src={post.mainImage?.asset?.url}
                          alt={post.mainImage?.alt || post.title}
                          fill
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                        />

                        {/* FEATURED BADGE */}
                        {post.featured && (

                          <div className="
                            absolute
                            left-4
                            top-4
                            rounded-full
                            bg-black/80
                            px-3
                            py-1
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-white
                            backdrop-blur-md
                          ">
                            Featured
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* CONTENT */}
                    <div className="p-6">

                      {/* CATEGORY */}
                      <p className="
                        mb-3
                        text-xs
                        uppercase
                        tracking-[0.25em]
                        text-[#8b7d6b]
                      ">
                        {post.category?.title}
                      </p>

                      {/* TITLE */}
                      <h2 className="
                        text-2xl
                        font-semibold
                        leading-tight
                        text-[#2c2520]
                      ">
                        {post.title}
                      </h2>

                      {/* EXCERPT */}
                      <p className="
                        mt-4
                        line-clamp-3
                        leading-relaxed
                        text-[#6b6258]
                      ">
                        {post.excerpt}
                      </p>

                      {/* FOOTER */}
                      <div className="mt-6 flex items-center justify-between">

                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="
                            text-sm
                            font-medium
                            text-[#2c2520]
                            underline-offset-4
                            transition-all
                            duration-300
                            hover:underline
                          "
                        >
                          Read Article →
                        </Link>

                        {post.readingTime && (
                          <span className="
                            text-xs
                            uppercase
                            tracking-[0.15em]
                            text-[#8b7d6b]
                          ">
                            {post.readingTime} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
