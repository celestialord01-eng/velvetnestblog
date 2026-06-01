           import type { Metadata } from "next"

import Link from "next/link"
import Image from "next/image"

import {
  ArrowRight,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { BlogCard } from "@/components/cards"

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
  category->slug.current == $category
]
      | order(_createdAt desc){
        _id,
        title,
        excerpt,
        publishedAt,
readingTime,
"slug": slug.current,
mainImage,
"category": category->title
      }`

    : `*[_type == "post"]
      | order(_createdAt desc){
        _id,
        title,
        excerpt,
        publishedAt,
readingTime,
"slug": slug.current,
mainImage,
"category": category->title
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
const storefrontCTA =
  await client.fetch(`
    *[_type == "storefrontCTA"][0]{
      title,
      description,
      buttonText,
      buttonLink,
      image
    }
  `)
 const about =
  await client.fetch(`
    *[_type == "aboutPage"][0]{
      title,
      subtitle,
      description,
      image
    }
  `)

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
    md:text-[6rem]
    lg:text-[7rem]
  "
>
  Stories & Inspiration
</h1>

<p
  className="
    mx-auto
    mt-8
    max-w-3xl
    text-[1.15rem]
    leading-9
    text-[#6b6057]
  "
>
  Fashion inspiration, beautiful homes,
  self-care rituals and intentional living—
  thoughtfully curated for modern women.
</p>

<div
  className="
    mt-12
    flex
    flex-wrap
    justify-center
    gap-4
  "
>

  <Link
    href="/category/fashion"
    className="
      border
      px-6
      py-3
      text-xs
      uppercase
      tracking-[0.2em]
    "
  >
    Fashion
  </Link>

  <Link
    href="/category/home-decor"
    className="
      border
      px-6
      py-3
      text-xs
      uppercase
      tracking-[0.2em]
    "
  >
    Home Decor
  </Link>

  <Link
    href="/category/beauty"
    className="
      border
      px-6
      py-3
      text-xs
      uppercase
      tracking-[0.2em]
    "
  >
    Beauty
  </Link>
</div>
</div>

        </section>

        

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
                    text-xs
                    uppercase
                    tracking-[0.22em]
                    transition
                    ${
                      isActive
                        ? "bg-[#d6b06f] text-black px-5 py-2 rounded-full"
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
              Editor's Pick
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
                  lg:grid-cols-[1.2fr_0.8fr]
                  lg:gap-20
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    aspect-[16/10]
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
                  Editor's Selection
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
                  Fresh Inspiration
                </h2>

              </div>

            </div>

            {/* POSTS GRID */}

            <div
  className="
    mt-16
    grid
    gap-12
    md:grid-cols-2
    xl:grid-cols-3
  "
>

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

              <Link
  href="/blog"
  className="
    inline-flex
    border
    border-[#2c2623]
    px-12
    py-5
    text-sm
    uppercase
    tracking-[0.25em]
  "
>
  Browse All Articles →
</Link>

            </div>

          </div>

        </section>
                 <section
  className="
    border-t
    border-border
    py-24
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
        overflow-hidden
        rounded-[2rem]
        bg-[#2a2420]
        text-white
      "
    >

      <div
        className="
          grid
          items-center
          lg:grid-cols-2
        "
      >

        <div
          className="
            relative
            aspect-[4/3]
          "
        >

          {storefrontCTA?.image && (

            <Image
              src={urlFor(storefrontCTA.image).width(1600).url()}
              alt={storefrontCTA.title}
              fill
              className="object-cover"
            />

          )}

        </div>

        <div className="p-10 md:p-16">

          <p
            className="
              text-xs
              uppercase
              tracking-[0.4em]
              text-[#d6b06f]
            "
          >
            SHOP MY FAVORITES
          </p>

          <h2
            className="
              mt-5
              font-serif
              text-4xl
              md:text-6xl
            "
          >
            Curated Finds I Actually Love
          </h2>

          <p
            className="
              mt-6
              max-w-lg
              text-white/70
              leading-relaxed
            "
          >
            Discover fashion essentials,
            cozy home decor,
            beauty favorites and lifestyle finds
            personally selected for VelvetNest readers.
          </p>

          <a
            href={storefrontCTA?.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-8
              inline-flex
              bg-[#d6b06f]
              px-8
              py-4
              text-sm
              uppercase
              tracking-[0.2em]
              text-black
            "
          >
            Visit Storefront
          </a>

        </div>

      </div>

    </div>

  </div>

</section>
                                    
                   <section
  className="
    py-28
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
        grid
        gap-16
        items-center
        lg:grid-cols-2
      "
    >

      <div
        className="
          relative
          aspect-[4/5]
          overflow-hidden
          rounded-[2rem]
        "
      >

        {about?.image && (

          <Image
            src={urlFor(about.image).width(1200).url()}
            alt="About VelvetNest"
            fill
            className="object-cover"
          />

        )}

      </div>

      <div>

        <p
          className="
            text-xs
            uppercase
            tracking-[0.35em]
            text-[#d6b06f]
          "
        >
          About VelvetNest
        </p>

        <h2
          className="
            mt-5
            font-serif
            text-5xl
            md:text-6xl
          "
        >
          Beautiful Living,
          Curated Daily.
        </h2>

        <p
          className="
            mt-8
            max-w-xl
            text-lg
            leading-relaxed
            text-muted-foreground
          "
        >
          VelvetNest was created to inspire
          women to build a life filled with
          style, beauty and intention.
          From fashion inspiration and home decor
          ideas to self-care rituals and curated finds,
          every piece of content is designed to help
          you create your most beautiful everyday life.
        </p>

        <Link
          href="/about"
          className="
            mt-8
            inline-flex
            border
            border-[#d6b06f]
            px-8
            py-4
            text-sm
            uppercase
            tracking-[0.2em]
          "
        >
          Read Our Story
        </Link>

      </div>

    </div>

  </div>

</section>

      </main>

      <Footer />

    </div>
  )
} 
