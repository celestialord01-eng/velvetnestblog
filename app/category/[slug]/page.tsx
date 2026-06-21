import type { Metadata } from "next"

import Image from "next/image"
import Link from "next/link"

import {
  notFound,
} from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { BlogCard } from "@/components/cards"

import { client } from "@/sanity/lib/client"

import {
  categoryPostsQuery,
} from "@/lib/queries"

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "fashion",
  "beauty",
  "home-decor",
  "outfit-ideas",
  "self-care",
]
const categoryDescriptions = {
  fashion:
    "Timeless style inspiration and fashion trends.",

  beauty:
    "Skincare, makeup and beauty inspiration.",

  "home-decor":
    "Elegant ideas to create a beautiful home.",

  "outfit-ideas":
    "Stylish looks for every occasion.",

  "self-care":
    "Simple habits for a better lifestyle.",
}

/* =========================================================
   TYPES
========================================================= */

type Props = {
  params: Promise<{
    slug: string
  }>
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const { slug } =
    await params

  const title =
    slug
      .replace(/-/g, " ")
      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      )

  return {
    title:
      `${title} | VelvetNest`,

    description:
      `Explore curated ${title} inspiration, timeless ideas, and elevated lifestyle content from VelvetNest.`,
  }
}

/* =========================================================
   PAGE
========================================================= */

export default async function CategoryPage({
  params,
}: Props) {

  const { slug } =
    await params

  if (
    !categories.includes(slug)
  ) {
    notFound()
  }

  const posts =
    await client.fetch(
      categoryPostsQuery,
      { slug }
    )

  const categoryTitle =
    slug
      .replace(/-/g, " ")
      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      )

  return (

    <div className="min-h-screen bg-background">

      <Header />

      <main>

        {/* =========================================================
            HERO
        ========================================================= */}

        <section
          className="
            relative
            overflow-hidden
            border-b
            border-border
          "
        >

          {/* BACKGROUND */}

          <div className="absolute inset-0">

            <Image
              src={`/categories/${slug}.jpg`}
              alt={categoryTitle}
              fill
              priority
              className="object-cover"
            />

            <div
              className="
                absolute
                inset-0
                bg-black/35
              "
            />

          </div>

          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              px-5
              py-32
              md:py-40
            "
          >

            <div
              className="
                mx-auto
                max-w-4xl
                text-center
                text-white
              "
            >

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.35em]
                  text-white/80
                "
              >
                VelvetNest Category
              </p>

              <h1
                className="
                  mt-5
                  font-serif
                  text-[4rem]
                  leading-[0.92]
                  tracking-[-0.06em]
                  md:text-[6rem]
                  lg:text-[7rem]
                "
              >
                {categoryTitle}
              </h1>

              <p
                className="
                  mx-auto
                  mt-8
                  max-w-2xl
                  text-[1.1rem]
                  leading-[2]
                  text-white/90
                "
              >
                Explore curated inspiration,
                timeless trends,
                and elevated lifestyle ideas from VelvetNest.
              </p>

            </div>

          </div>

        </section>

        {/* =========================================================
            POSTS
        ========================================================= */}

        <section
          className="
            py-24
            md:py-32
          "
        >

          <div
            className="
              mx-auto
              max-w-7xl
              px-5
            "
          >

            {/* EMPTY */}

            {posts.length === 0 && (

              <div
                className="
                  rounded-[2.5rem]
                  border
                  border-dashed
                  border-border
                  bg-card
                  px-10
                  py-24
                  text-center
                "
              >

                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.25em]
                    text-muted-foreground
                  "
                >
                  Coming Soon
                </p>

                <h2
                  className="
                    mt-5
                    font-serif
                    text-[3rem]
                    tracking-[-0.05em]
                    text-foreground
                  "
                >
                  No articles yet
                </h2>

                <p
                  className="
                    mx-auto
                    mt-5
                    max-w-lg
                    text-[1.05rem]
                    leading-8
                    text-[#6b6057]
                  "
                >
                  Curated articles for this category
                  will appear here soon.
                </p>

              </div>

            )}

            {/* POSTS */}

            {posts.length > 0 && (

              <>
                {/* LABEL */}

                <div
                  className="
                    mb-14
                    flex
                    items-end
                    justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        text-[11px]
                        uppercase
                        tracking-[0.35em]
                        text-muted-foreground
                      "
                    >
                      Curated Articles
                    </p>

                    <h2
  className="
    mt-4
    font-serif
    text-[3rem]
    tracking-[-0.05em]
    md:text-[5rem]
  "
>
  {categoryTitle}
</h2>
                    <p
  className="
    mt-4
    max-w-xl
    text-muted-foreground
  "
>
  {
    categoryDescriptions[
      slug as keyof typeof categoryDescriptions
    ]
  }
</p>

                  </div>

                  <p
                    className="
                      hidden
                      text-sm
                      text-muted-foreground
                      md:block
                    "
                  >
                    {posts.length} Articles
                  </p>

                </div>

                {/* GRID */}

                <div
  className="
    grid
    gap-12
    md:grid-cols-2
  "
>

                  {posts.map(
                    (post: any) => (

                      <BlogCard
                        key={post._id}
                        title={post.title}
                        excerpt={post.excerpt}
                        image={
                          post.mainImage?.asset
                            ?.url
                        }
                        category={
                          post.category
                            ?.title
                        }
                        date={
                          post.publishedAt
                            ? new Date(
                                post.publishedAt
                              ).toDateString()
                            : "Recently Published"
                        }
                        slug={
                          post.slug.current
                        }
                        featured={
                          post.featured
                        }
                        readingTime={
                          post.readingTime
                        }
                      />

                    )
                  )}

                </div>
              </>

            )}

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
    }
