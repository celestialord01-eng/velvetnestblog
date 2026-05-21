import Image from "next/image"
import Link from "next/link"

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
        "slug": slug.current,
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
                  >
                    {hero?.buttonText ||
                      "Explore the Blog"}
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

              {/* FLOATING CARD */}

              <div
                className="
                  absolute
                  -bottom-5
                  left-5
                  rounded-[1.8rem]
                  border
                  border-border
                  bg-background/90
                  p-5
                  backdrop-blur-xl
                "
              >

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.22em]
                    text-muted-foreground
                  "
                >
                  Trending Now
                </p>

                <p
                  className="
                    mt-2
                    font-serif
                    text-[1.4rem]
                    tracking-[-0.03em]
                  "
                >
                  Quiet Luxury Fashion
                </p>

              </div>

              {/* FLOATING STATS */}

              <div
                className="
                  absolute
                  right-5
                  top-6
                  rounded-[1.8rem]
                  border
                  border-border
                  bg-background/90
                  p-5
                  backdrop-blur-xl
                "
              >

                <p
                  className="
                    font-serif
                    text-[2.2rem]
                    leading-none
                  "
                >
                  500+
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    uppercase
                    tracking-[0.18em]
                    text-muted-foreground
                  "
                >
                  Curated Finds
                </p>

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
              (category: any) => (

                <Link
                  key={category._id}
                  href={`/category/${category.slug}`}
                  className="
                    group
                    relative
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

                    <p
                      className="
                        mt-1
                        text-sm
                        text-white/80
                      "
                    >
                      {category.count || 0} articles
                    </p>

                  </div>

                </Link>

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

              <Link
                href="/blog"
                className="
                  hidden
                  items-center
                  gap-2
                  text-[12px]
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  hover:gap-3
                  md:flex
                "
              >

                View All

                <ArrowRight className="h-4 w-4" />

              </Link>

            </div>

            <div className="masonry-grid mt-16">

              {blogPosts.map(
                (post: any) => (

                  <BlogCard
                    key={post._id}
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

                )
              )}

            </div>

          </div>

        </section>

        {/* =========================================================
            AMAZON FINDS
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
                Curated for You
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
                Amazon Finds
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-[1.05rem]
                  leading-8
                  text-muted-foreground
                "
              >
                Elevated fashion, cozy interiors,
                beauty favorites, and curated lifestyle finds
                for modern feminine living.
              </p>

            </div>

            <Link
              href="/amazon-finds"
              className="
                hidden
                items-center
                gap-2
                text-[12px]
                uppercase
                tracking-[0.18em]
                transition-all
                hover:gap-3
                md:flex
              "
            >

              Shop All

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>

          <div className="masonry-grid mt-16">

            {amazonFinds.map(
              (product: any) => (

                <ProductCard
                  key={product._id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={
                    product.image
                      ? urlFor(product.image).width(1000).url()
                      : "/placeholder.jpg"
                  }
                  link={
                    product.affiliateLink ||
                    "#"
                  }
                  category={
                    product.category ||
                    "Amazon Find"
                  }
                />

              )
            )}

          </div>

        </section>

        {/* =========================================================
            ABOUT
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
              grid
              max-w-7xl
              items-center
              gap-20
              px-5
              lg:grid-cols-2
            "
          >

            {/* IMAGE */}

            <div
              className="
                group
                overflow-hidden
                rounded-[2.5rem]
              "
            >

              <div
                className="
                  relative
                  aspect-square
                  bg-[#e8e0d6]
                "
              >

                {about?.image && (

                  <Image
                    src={urlFor(about.image).width(1600).url()}
                    alt={
                      about?.title ||
                      "About VelvetNest"
                    }
                    fill
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

            {/* CONTENT */}

            <div className="space-y-8">

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.35em]
                  text-muted-foreground
                "
              >
                About VelvetNest
              </p>

              <h2
                className="
                  font-serif
                  text-[3rem]
                  leading-[0.95]
                  tracking-[-0.05em]
                  md:text-[5rem]
                "
              >
                {about?.title}
              </h2>

              <p
                
