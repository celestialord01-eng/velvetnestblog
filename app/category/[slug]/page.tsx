import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { client } from "@/sanity/lib/client"
import { categoryPostsQuery } from "@/lib/queries"

const categories = [
  "fashion",
  "beauty",
  "home-decor",
  "outfit-ideas",
  "self-care",
]

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!categories.includes(slug)) {
    notFound()
  }

  const posts = await client.fetch(categoryPostsQuery, {
    slug,
  })

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f5f1]">

        {/* HERO */}
        <section className="border-b border-[#ece6de] px-4 py-20">

          <div className="mx-auto max-w-4xl text-center">

            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#8b7d6b]">
              VelvetNest Category
            </p>

            <h1 className="text-5xl font-semibold capitalize tracking-tight text-[#2c2520]">
              {slug.replace("-", " ")}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6b6258]">
              Explore curated inspiration and timeless lifestyle content.
            </p>
          </div>
        </section>

        {/* POSTS */}
        <section className="px-4 py-16">

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

              {posts.map((post: any) => (

                <article
                  key={post._id}
                  className="
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  <Link href={`/blog/${post.slug.current}`}>

                    <div className="relative aspect-[4/5] overflow-hidden">

                      <Image
                        src={post.mainImage?.asset?.url}
                        alt={post.mainImage?.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="p-6">

                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#8b7d6b]">
                      {post.category.replace("-", " ")}
                    </p>

                    <h2 className="text-2xl font-semibold text-[#2c2520]">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-[#6b6258]">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="
                        mt-5
                        inline-block
                        text-sm
                        font-medium
                        text-[#2c2520]
                        underline-offset-4
                        hover:underline
                      "
                    >
                      Read Article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
