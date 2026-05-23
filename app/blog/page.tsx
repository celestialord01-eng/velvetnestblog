           import type { Metadata } from "next"

import Link from "next/link"
import Image from "next/image"

import {
  ArrowRight,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { BlogCard } from "@/components/cards"

import { Button } from "@/components/ui/button"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Blog | VelvetNest",

  description:
    "Explore fashion inspiration, elevated interiors, beauty favorites, and lifestyle ideas curated for beautiful living.",
}

/* =========================================================
   FETCH POSTS
========================================================= */

async function getPosts(
  category?: string
) {

  const query = category

    ? `*[
        _type == "post" &&
        categories[0]->slug.current == $category
      ]
      | order(_createdAt desc){
        _id,
        title,
        excerpt,
        publishedAt,
        "slug": slug.current,
        mainImage,
        "category": categories[0]->title
      }`

    : `*[_type == "post"]
      | order(_createdAt desc){
        _id,
        title,
        excerpt,
        publishedAt,
        "slug": slug.current,
        mainImage,
        "category": categories[0]->title
      }`

  return await client.fetch(
    query,
    { category }
  )
}

/* =========================================================
   TYPES
========================================================= */

interface BlogPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {

  const {
    category,
  } = await searchParams

  const posts =
    await getPosts(category)

  const featuredPost =
    posts[0]

  const remainingPosts =
    posts.slice(1)

  return (

    <div className="min-h-screen bg-background">

      <Header />

      <main>

        {/* =========================================================
            HERO
        ========================================================= */}

        <section
          className="
            border-b
            border-border
            py-24
            md:py-36
          "
        >

          <div
            className="
              mx-auto
              max-w-5xl
              px-5
              text-center
            "
          >

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-muted-foreground
              "
            >
              The VelvetNest Journal
            </p>

            <h1
              className="
                mt-5
                font-serif
                text-[4rem]
                leading-[0.92]
                tracking-[-0.06em]
                text-foreground
                md:text-[6rem]
                lg:text-[7rem]
              "
            >
              Stories &
              Inspiration
            </h1>

            <p
              className="
                mx-auto
                mt-8
                max-w-2xl
                text-[1.15rem]
                leading-[2]
                text-[#6b6057]
              "
            >
              Discover curated fashion inspiration,
              elevated interiors,
              beauty rituals,
              self-care ideas,
              and lifestyle stories designed for intentional living.
            </p>

          </div>

        </section>

        {/* =========================================================
            CATEGORY NAV
        ========================================================= */}

        <section
          className="
            border-b
            border-border
            py-6
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-7xl
              flex-wrap
              items-center
              justify-center
              gap-6
              px-5
            "
          >

            {[
              {
                href: "/blog",
                label: "All Posts",
              },

              {
                href: "/blog?category=fashion",
                label: "Fashion",
              },

              {
                href: "/blog?category=beauty",
                label: "Beauty",
              },

              {
                href: "/blog?category=home-decor",
                label: "Home Decor",
              },

              {
                href: "/blog?category=outfit-ideas",
                label: "Outfit Ideas",
              },

              {
                href: "/blog?category=self-care",
                label: "Self Care",
              },
            ].map((item) => {

              const isActive =
                item.href === "/blog"
                  ? !category
                  : item.href.includes(
                      category || ""
                    )

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-[11px]
                    uppercase
                    tracking-[0.22em]
                    transition
                    ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >

                  {item.label}

                </Link>

              )
            })}

          </div>

        </section>

        {/* =========================================================
            FEATURED ARTICLE
        ========================================================= */}

        {featuredPost && (

          <section
            className="
              mx-auto
              max-w-7xl
              px-5
              py-24
            "
          >

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-muted-foreground
              "
            >
              Featured Article
            </p>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="
                group
                mt-10
                block
              "
            >

              <div
                className="
                  grid
                  gap-14
                  lg:grid-cols-2
                  lg:gap-20
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    aspect-[4/5]
                    overflow-hidden
                    rounded-[2.8rem]
                  "
                >

                  <Image
                    src={
                      featuredPost.mainImage
                        ? urlFor(
                            featuredPost.mainImage
                          )
                            .width(1600)
                            .url()
                        : "/placeholder.jpg"
                    }
                    alt={featuredPost.title}
                    fill
                    priority
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-[1.03]
                    "
                  />

                  <div
                    className="
                      absolute
                      left-5
                      top-5
                    "
                  >

                    <span
                      className="
                        rounded-full
                        bg-background/85
                        px-4
                        py-2
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                        text-foreground
                        backdrop-blur-md
                      "
                    >
                      {featuredPost.category}
                    </span>

                  </div>

                </div>

                {/* CONTENT */}

                <div
                  className="
                    flex
                    flex-col
                    justify-center
                  "
                >

                  <p
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.22em]
                      text-muted-foreground
                    "
                  >
                    {featuredPost.publishedAt
                      ? new Date(
                          featuredPost.publishedAt
                        ).toDateString()
                      : "Recently Published"}
                  </p>

                  <h2
                    className="
                      mt-5
                      font-serif
                      text-[3.2rem]
                      leading-[0.95]
                      tracking-[-0.05em]
                      text-foreground
                      transition
                      group-hover:opacity-70
                      md:text-[4.8rem]
                    "
                  >
                    {featuredPost.title}
                  </h2>

                  <p
                    className="
                      mt-8
                      max-w-xl
                      text-[1.08rem]
                      leading-9
                      text-[#6b6057]
                    "
                  >
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-10">

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-[12px]
                        uppercase
                        tracking-[0.18em]
                        transition-all
                        duration-300
                        group-hover:gap-3
                      "
                    >

                      Read Article

                      <ArrowRight className="h-4 w-4" />

                    </span>

                  </div>

                </div>

              </div>

            </Link>

          </section>

        )}

        {/* =========================================================
            ALL POSTS
        ========================================================= */}

        <section
          className="
            border-t
            border-border
            bg-[#f4efe8]/40
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

            <div
              className="
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
                  Latest Stories
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
                  Explore Articles
                </h2>

              </div>

            </div>

            {/* POSTS GRID */}

            <div className="masonry-grid mt-16">

              {remainingPosts.map(
                (post: any) => (

                  <BlogCard
                    key={post._id}
                    title={post.title}
                    excerpt={post.excerpt}
                    image={
                      post.mainImage
                        ? urlFor(
                            post.mainImage
                          )
                            .width(1000)
                            .url()
                        : "/placeholder.jpg"
                    }
                    category={
                      post.category
                    }
                    date={
                      post.publishedAt
                        ? new Date(
                            post.publishedAt
                          ).toDateString()
                        : "No date"
                    }
                    slug={post.slug}
                  />

                )
              )}

            </div>

            {/* LOAD MORE */}

            <div className="mt-20 text-center">

              <Button
                variant="outline"
                size="lg"
                className="
                  h-14
                  rounded-full
                  border-border
                  bg-card
                  px-8
                  text-[12px]
                  uppercase
                  tracking-[0.18em]
                  hover:bg-card
                "
              >
                Load More Articles
              </Button>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
} 
