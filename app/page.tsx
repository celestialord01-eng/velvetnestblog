import Image from "next/image"
import Link from "next/link"
export const revalidate = 60
import {
  ArrowRight,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import {
  BlogCard,
  ProductCard,
} from "@/components/cards"

import { NewsletterPopup } from "@/components/newsletter-popup"

import { Reveal } from "@/components/reveal"

import { Button } from "@/components/ui/button"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

/* =========================================================
   HOMEPAGE
========================================================= */

export default async function HomePage() {

  /* HERO */

  const hero =
    await client.fetch(`
      *[_type == "hero"][0]{
        eyebrow,
        title1,
        title2,
        title3,
        description,
        buttonText,
        buttonLink,
        heroImage
      }
    `)

  /* CATEGORIES */

  const categories =
    await client.fetch(`
      *[_type == "category"]
      | order(title asc){
        _id,
        title,
        "slug": slug.current,
        image,
        "count": count(*[_type == "post" && references(^._id)])
      }
    `)

  /* POSTS */

  const blogPosts =
    await client.fetch(`
      *[_type == "post"]
      | order(featured desc, publishedAt desc)[0...6]{
        _id,
        title,
        excerpt,
        publishedAt,
        slug,
        mainImage,
        featured,
        "category": category->title
      }
    `)

  /* AMAZON FINDS */

  const amazonFinds =
    await client.fetch(`
      *[_type == "amazonFind"]
      | order(featured desc, _createdAt desc)[0...4]{
        _id,
        title,
        price,
        originalPrice,
        affiliateLink,
        image,
        featured,
        "category": category->title
      }
    `)

  /* ABOUT */

  const about =
    await client.fetch(`
      *[_type == "aboutPage"][0]{
        title,
        subtitle,
        description,
        image
      }
    `)

  return (

    <div className="min-h-screen bg-background text-foreground">

      <Header posts={blogPosts} />

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

          <Reveal>

            <div
              className="
                mx-auto
                grid
                max-w-7xl
                items-center
                gap-20
                px-5
                py-24
                md:py-36
                lg:grid-cols-2
              "
            >

              {/* LEFT */}

              <div
                className="
                  space-y-8
                  text-center
                  lg:text-left
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
                  {hero?.eyebrow ||
                    "Welcome to VelvetNest"}
                </p>

                <h1
                  className="
                    font-serif
                    text-[4rem]
                    leading-[0.92]
                    tracking-[-0.06em]
                    text-foreground
                    md:text-[5.8rem]
                    lg:text-[7rem]
                  "
                >

                  {hero?.title1 && (
                    <span className="block">
                      {hero.title1}
                    </span>
                  )}

                  {hero?.title2 && (
                    <span className="block">
                      {hero.title2}
                    </span>
                  )}

                  {hero?.title3 && (
                    <span
                      className="
                        block
                        text-[#9b7f66]
                      "
                    >
                      {hero.title3}
                    </span>
                  )}

                </h1>

                <p
                  className="
                    mx-auto
                    max-w-xl
                    text-[1.15rem]
                    leading-[2]
                    text-[#6b6057]
                    lg:mx-0
                  "
                >
                  {hero?.description}
                </p>

                {/* BUTTONS */}

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:justify-center
                    lg:justify-start
                  "
                >

                  <Button
                    asChild
                    size="lg"
                    className="
                      h-14
                      rounded-full
                      bg-[#2c2623]
                      px-8
                      text-[12px]
                      uppercase
                      tracking-[0.18em]
                      text-white
                      hover:bg-black
                    "
                  >

                    <Link
  href={
    hero?.buttonLink ||
    "/blog"
  }
  className="flex items-center gap-2"
>
  {hero?.buttonText ||
    "Explore the Blog"}

  <ArrowRight className="h-4 w-4" />
</Link>

                  </Button>

                  <Button
                    asChild
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

                    <Link href="/amazon-finds">
                      Shop Amazon Finds
                    </Link>

                  </Button>

                </div>

              </div>

              {/* HERO IMAGE */}

              <div className="relative">

                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[2.8rem]
                  "
                >

                  <div
                    className="
                      relative
                      aspect-[4/5]
                      bg-[#ede7df]
                    "
                  >

                    {hero?.heroImage && (

                      <Image
                        src={urlFor(hero.heroImage).width(1600).url()}
                        alt="VelvetNest Hero"
                        fill
                        priority
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-[1.03]
                        "
                      />

                    )}

                  </div>

                </div>

              </div>

            </div>

          </Reveal>

        </section>

        {/* =========================================================
            CATEGORIES
        ========================================================= */}

        <section
          className="
            mx-auto
            max-w-7xl
            px-5
            py-24
            md:py-32
          "
        >

          <Reveal>

            <div className="text-center">

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.35em]
                  text-muted-foreground
                "
              >
                Browse By Category
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
                Find Your Inspiration
              </h2>

            </div>

          </Reveal>

          <div
            className="
              mt-16
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-5
            "
          >

            {categories.map(
              (category: any, index: number) => (

                <Reveal
                  key={category._id}
                  delay={0.08 * index}
                >

                  <Link
                    href={`/category/${category.slug}`}
                    className="
                      group
                      relative
                      block
                      aspect-[3/4]
                      overflow-hidden
                      rounded-[2.2rem]
                      bg-[#ece5dc]
                    "
                  >

                    {category?.image && (

                      <Image
                        src={urlFor(category.image).width(1200).url()}
                        alt={category.title}
                        fill
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                    )}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/40
                        via-black/10
                        to-transparent
                      "
                    />

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-6
                        text-center
                      "
                    >

                      <h3
                        className="
                          font-serif
                          text-[2rem]
                          tracking-[-0.03em]
                          text-white
                        "
                      >
                        {category.title}
                      </h3>

                    </div>

                  </Link>

                </Reveal>

              )
            )}

          </div>

        </section>

        {/* =========================================================
            TRENDING POSTS
        ========================================================= */}

        <section
          className="
            border-y
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

            <Reveal>

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
                    Latest Articles
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
                    Trending on VelvetNest
                  </h2>

                </div>

              </div>

            </Reveal>

            <div className="masonry-grid mt-16">

              {blogPosts.map(
                (post: any, index: number) => (

                  <Reveal
                    key={post._id}
                    delay={0.08 * index}
                  >

                    <BlogCard
                      title={post.title}
                      excerpt={post.excerpt}
                      image={
                        post.mainImage
                          ? urlFor(post.mainImage).width(1000).url()
                          : "/placeholder.jpg"
                      }
                      category={
                        post.category ||
                        "Lifestyle"
                      }
                      date={
                        post.publishedAt
                          ? new Date(post.publishedAt).toDateString()
                          : "No date"
                      }
                      slug={post.slug}
                      featured={post.featured}
                    />

                  </Reveal>

                )
              )}

            </div>

          </div>

        </section>

      </main>

      <Footer />
      <NewsletterPopup />

    </div>
  )
                  }
