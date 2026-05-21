import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard, ProductCard } from "@/components/cards"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { Button } from "@/components/ui/button"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

export default async function HomePage() {

  // HERO
  const hero = await client.fetch(`
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

  // CATEGORIES
  const categories = await client.fetch(`
    *[_type == "category"] | order(title asc){
      _id,
      title,
      "slug": slug.current,
      image,
      "count": count(*[_type == "post" && references(^._id)])
    }
  `)

  // POSTS
  const blogPosts = await client.fetch(`
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

  // AMAZON FINDS
  const amazonFinds = await client.fetch(`
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

  // ABOUT
  const about = await client.fetch(`
    *[_type == "aboutPage"][0]{
      title,
      subtitle,
      description,
      image
    }
  `)

  return (
    <div className="min-h-screen bg-[#f8f5f1] text-[#2c2520]">

      <Header />

      <main>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[#ece6de] bg-[#f3efe9]">

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">

            {/* LEFT CONTENT */}
            <div className="space-y-7 text-center lg:text-left">

              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8b7d6b]">
                {hero?.eyebrow || "Welcome to VelvetNest"}
              </p>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">

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
                  <span className="block text-[#8d6e63]">
                    {hero.title3}
                  </span>
                )}

              </h1>

              <p className="mx-auto max-w-xl text-lg leading-8 text-[#6b6258] lg:mx-0">
                {hero?.description}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

                <Button
                  asChild
                  size="lg"
                  className="
                    h-12 rounded-full bg-[#2c2520]
                    px-8 text-white transition-all
                    duration-300 hover:bg-[#1d1814]
                  "
                >
                  <Link href={hero?.buttonLink || "/blog"}>
                    {hero?.buttonText || "Explore the Blog"}
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="
                    h-12 rounded-full border-[#d7cec3]
                    bg-white px-8 text-[#2c2520]
                    hover:bg-[#f5f0ea]
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

              <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl">

                <div className="relative aspect-[4/5] bg-[#ede7df]">

                  {hero?.heroImage && (
                    <>
                      <Image
                        src={urlFor(hero.heroImage).width(1400).url()}
                        alt="VelvetNest Hero"
                        fill
                        priority
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-105
                        "
                      />

                      <div className="absolute inset-0 bg-black/10" />
                    </>
                  )}

                </div>

              </div>

              {/* FLOATING CARD */}
              <div className="absolute -bottom-5 left-4 rounded-2xl border border-[#ece6de] bg-white/95 p-5 shadow-xl backdrop-blur-md md:left-8">

                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8b7d6b]">
                  Trending Now
                </p>

                <p className="mt-2 text-sm font-semibold">
                  Quiet Luxury Fashion
                </p>

              </div>

              {/* FLOATING STATS */}
              <div className="absolute right-4 top-6 rounded-2xl border border-[#ece6de] bg-white/95 p-5 shadow-xl backdrop-blur-md md:right-8">

                <p className="text-2xl font-bold">
                  500+
                </p>

                <p className="text-xs text-[#7a7065]">
                  Curated Finds
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* CATEGORIES */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:py-24">

          <div className="text-center">

            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8b7d6b]">
              Browse By Category
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Find Your Inspiration
            </h2>

          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {categories.map((category: any) => (

              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="
                  group relative aspect-[3/4]
                  overflow-hidden rounded-[1.8rem]
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
                      group-hover:scale-110
                    "
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      20vw
                    "
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">

                  <h3 className="text-xl font-semibold text-white">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    {category.count || 0} articles
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* TRENDING POSTS */}
        <section className="border-y border-[#ece6de] bg-[#f3efe9] py-20 md:py-24">

          <div className="mx-auto max-w-7xl px-4">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8b7d6b]">
                  Latest Articles
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                  Trending on VelvetNest
                </h2>

              </div>

              <Link
                href="/blog"
                className="
                  hidden items-center gap-2
                  text-sm font-medium transition-all
                  hover:gap-3 md:flex
                "
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            <div className="masonry-grid mt-14">

              {blogPosts.map((post: any) => (

                <BlogCard
                  key={post._id}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={
                    post.mainImage
                      ? urlFor(post.mainImage).width(1000).url()
                      : "/placeholder.jpg"
                  }
                  category={post.category || "Lifestyle"}
                  date={
                    post.publishedAt
                      ? new Date(post.publishedAt).toDateString()
                      : "No date"
                  }
                  slug={post.slug}
                  featured={post.featured}
                />

              ))}

            </div>

          </div>

        </section>

        {/* AMAZON FINDS */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:py-24">

          <div className="flex items-end justify-between">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8b7d6b]">
                Curated for You
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Amazon Finds
              </h2>

              <p className="mt-3 max-w-lg text-[#6b6258]">
                Elevated fashion, cozy home decor, beauty favorites,
                and lifestyle essentials curated for modern feminine living.
              </p>

            </div>

            <Link
              href="/amazon-finds"
              className="
                hidden items-center gap-2
                text-sm font-medium transition-all
                hover:gap-3 md:flex
              "
            >
              Shop All
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          <div className="masonry-grid mt-14">

            {amazonFinds.map((product: any) => (

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
                link={product.affiliateLink || "#"}
                category={product.category || "Amazon Find"}
              />

            ))}

          </div>

        </section>

        {/* ABOUT */}
        <section className="border-t border-[#ece6de] bg-[#f3efe9] py-20 md:py-24">

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">

            {/* IMAGE */}
            <div className="group overflow-hidden rounded-[2rem] shadow-xl">

              <div className="relative aspect-square bg-[#e8e0d6]">

                {about?.image && (
                  <Image
                    src={urlFor(about.image).width(1400).url()}
                    alt={about?.title || "About VelvetNest"}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}

              </div>

            </div>

            {/* CONTENT */}
            <div className="space-y-7">

              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8b7d6b]">
                About VelvetNest
              </p>

              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                {about?.title}
              </h2>

              <p className="text-xl text-[#6b6258]">
                {about?.subtitle}
              </p>

              <p className="leading-8 text-[#6b6258]">
                {about?.description}
              </p>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="
                  h-12 rounded-full border-[#d7cec3]
                  bg-white px-8 hover:bg-[#f5f0ea]
                "
              >

                <Link href="/about">
                  Read My Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

              </Button>

            </div>

          </div>

        </section>

      </main>

      <Footer />
      <NewsletterPopup />

    </div>
  )
          }
