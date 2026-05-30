import Image from "next/image"
import Link from "next/link"
export const revalidate = 60
import {
  ArrowRight,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import {} from "@/components/cards"

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
      title,
      subtitle,
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
  "slug": slug.current,
  mainImage,
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
const featuredPost =
  blogPosts.find((post: any) => post.featured) ||
  blogPosts[0]

const regularPosts =
  blogPosts
    .filter((post: any) => post._id !== featuredPost._id)
    .slice(0, 3)
  return (

    <div className="min-h-screen bg-background text-foreground">

      <Header posts={blogPosts} />

      <main>

        {/* =========================================================
            HERO
        ========================================================= */}
<section className="relative overflow-hidden">

  <div className="relative h-[80vh] min-h-[550px]
md:min-h-[650px]">

    {/* Background Image */}

    {hero?.heroImage && (

      <Image
        src={urlFor(hero.heroImage).width(2200).url()}
        alt="VelvetNest Hero"
        fill
        priority
        className="object-cover"
      />

    )}

    {/* Dark Luxury Overlay */}

    <div className="absolute inset-0 bg-black/40" />

    {/* Content */}

    <div className="absolute inset-0 flex items-center pt-12 md:pt-0">

      <div className="mx-auto w-full max-w-7xl px-6">

        <Reveal>

          <div className="max-w-2xl">

            <p
              className="
                mb-6
                text-xs
                uppercase
                tracking-[0.45em]
                text-[#d6b06f]
              "
            >
              {hero?.eyebrow || "Welcome To VelvetNest"}
            </p>

            <h1
  className="
    font-serif
    text-4xl
    sm:text-5xl
    md:text-7xl
    lg:text-8xl
    leading-[1]
    text-white
    drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]
  "
>
  {hero?.title}
</h1>

            <p
              className="
                mt-8
                max-w-md
                text-lg
                leading-relaxed
                text-white/90
              "
            >
              {hero?.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Button
                asChild
                size="lg"
                className="
                  h-12 md:h-14
                  rounded-none
                  bg-[#d6b06f]
                  px-10
                  text-black
                  uppercase
                  tracking-[0.2em]
                  hover:opacity-90
                "
              >
                <Link
                  href={
                    hero?.buttonLink ||
                    "/blog"
                  }
                >
                  {hero?.buttonText ||
                    "Explore Blog"}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="
                  h-12 md:h-14
                  rounded-none
                  border-white
                  bg-transparent
                  px-10
                  uppercase
                  tracking-[0.2em]
                  text-white
                  hover:bg-white
                  hover:text-black
                "
              >
                <Link href="/amazon-finds">
                  Amazon Finds
                </Link>
              </Button>

            </div>

          </div>

        </Reveal>

      </div>

    </div>

  </div>

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
                Explore VelvetNest
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
                Explore The World Of VelvetNest
              </h2>

            </div>

          </Reveal>

          <div
  className="
    mt-16
    grid
    gap-5
    md:grid-cols-2
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
                    className={`
  group
  relative
  block
  overflow-hidden
  rounded-[2rem]
  bg-[#ece5dc]
  ${
    index === 4
      ? "aspect-[21/9] md:col-span-2"
      : "aspect-[4/3]"
  }
`}
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
                          group-hover:scale-110
                        "
                      />

                    )}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-black/35
transition-opacity
duration-500
group-hover:bg-black/20
                      "
                    />

                    <div
                      className="
                        absolute
bottom-0
left-0
p-8
md:p-10
                      "
                    >
                      <p
  className="
    mb-2
    text-[10px]
    uppercase
    tracking-[0.4em]
    text-white/70
  "
>
  Category
</p>
       
                      <h3
  className="
    font-serif
    text-3xl
    md:text-5xl
    tracking-[-0.04em]
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
<div className="mt-10 flex flex-wrap gap-4">

  <button
    className="
      bg-[#1f1a17]
      px-8
      py-4
      text-sm
      uppercase
      tracking-[0.2em]
      text-[#d6b06f]
    "
  >
    All
  </button>

  <button
    className="
      border
      border-[#d6b06f]
      px-8
      py-4
      text-sm
      uppercase
      tracking-[0.2em]
    "
  >
    Fashion
  </button>

  <button
    className="
      border
      border-[#d6b06f]
      px-8
      py-4
      text-sm
      uppercase
      tracking-[0.2em]
    "
  >
    Home Decor
  </button>

  <button
    className="
      border
      border-[#d6b06f]
      px-8
      py-4
      text-sm
      uppercase
      tracking-[0.2em]
    "
  >
    Beauty
  </button>

</div>
                </div>

              </div>

            </Reveal>
            <div className="mt-16">

  {/* FEATURED ARTICLE */}

  <Link
    href={`/blog/${featuredPost.slug}`}
    className="
      group
      block
      overflow-hidden
      bg-[#1f1a17]
      text-white
    "
  >

    <div className="aspect-[16/7] relative">

      <Image
        src={
          featuredPost.mainImage
            ? urlFor(featuredPost.mainImage)
                .width(1600)
                .url()
            : "/placeholder.jpg"
        }
        alt={featuredPost.title}
        fill
        className="
          object-cover
          opacity-70
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />

    </div>

    <div className="p-10 md:p-14">

      <div
        className="
          inline-block
          bg-[#d6b06f]
          px-4
          py-2
          text-xs
          uppercase
          tracking-[0.3em]
          text-black
        "
      >
        Featured
      </div>

      <h3
        className="
          mt-6
          font-serif
          text-4xl
          md:text-6xl
        "
      >
        {featuredPost.title}
      </h3>

      <p
        className="
          mt-6
          max-w-2xl
          text-white/70
        "
      >
        {featuredPost.excerpt}
      </p>

    </div>

  </Link>

  {/* ARTICLE LIST */}

  <div
    className="
      mt-12
      divide-y
      divide-border
      border-t
      border-b
    "
  >

    {regularPosts.map((post: any) => (

      <Link
        key={post._id}
        href={`/blog/${post.slug.current}`}
        className="
          grid
          gap-6
          py-8
          md:grid-cols-[260px_1fr]
          items-center
        "
      >

        <div
          className="
            relative
            aspect-[4/3]
            overflow-hidden
          "
        >

          <Image
            src={
              post.mainImage
                ? urlFor(post.mainImage)
                    .width(800)
                    .url()
                : "/placeholder.jpg"
            }
            alt={post.title}
            fill
            className="object-cover"
          />

        </div>

        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-muted-foreground
            "
          >
            {post.category}
          </p>

          <h3
            className="
              mt-3
              font-serif
              text-3xl
            "
          >
            {post.title}
          </h3>

        </div>

      </Link>

    ))}

  </div>

  {/* VIEW ALL */}

  <div className="mt-12 text-center">

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
      View All Articles →
    </Link>

  </div>

</div>

            

          </div>

        </section>

      </main>

      <Footer />
      <NewsletterPopup />

    </div>
  )
                  }
