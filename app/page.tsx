
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
      count
    }
  `)

  // POSTS
  const blogPosts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...6]{
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      mainImage,
      featured,
      "category": categories[0]->title
    }
  `)

  // AMAZON FINDS
  const amazonFinds = await client.fetch(`
    *[_type == "amazonFind"] | order(_createdAt desc)[0...4]{
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

  // ABOUT PAGE
  const about = await client.fetch(`
    *[_type == "aboutPage"][0]{
      title,
      subtitle,
      description,
      image
    }
  `)

  return (
    <div className="min-h-screen">
      <Header />

      <main>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">

            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

              {/* LEFT CONTENT */}
              <div className="animate-fade-up space-y-6 text-center lg:text-left">

                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {hero?.eyebrow || "Welcome to VelvetNest"}
                </p>

                <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  <span className="block">{hero?.title1}</span>
                  <span className="block">{hero?.title2}</span>
                  <span className="block text-accent">
                    {hero?.title3}
                  </span>
                </h1>

                <p className="mx-auto max-w-md text-lg leading-relaxed text-muted-foreground lg:mx-0">
                  {hero?.description}
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">

                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href={hero?.buttonLink || "/blog"}>
                      {hero?.buttonText || "Explore the Blog"}
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link href="/amazon-finds">
                      Shop My Finds
                    </Link>
                  </Button>

                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative animate-fade-in">

                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card">

                  {hero?.heroImage && (
                    <Image
                      src={urlFor(hero.heroImage).width(1200).url()}
                      alt="VelvetNest Hero"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}

                </div>

                {/* FLOATING CARDS */}
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-xl md:-left-8 md:p-6">

                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Trending Now
                  </p>

                  <p className="mt-1 font-semibold">
                    Spring Capsule Wardrobe
                  </p>

                </div>

                <div className="absolute -right-4 top-8 rounded-xl bg-card p-4 shadow-xl md:-right-8 md:p-6">

                  <p className="text-2xl font-bold">500+</p>

                  <p className="text-xs text-muted-foreground">
                    Curated Finds
                  </p>

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">

          <div className="text-center">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Browse By Category
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Find Your Inspiration
            </h2>

          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {categories.map((category: any) => (

              <Link
                key={category._id}
                href={`/blog?category=${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-card"
              >

                {category?.image && (
                  <Image
                    src={urlFor(category.image).width(1000).url()}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           20vw"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">

                  <h3 className="text-lg font-semibold text-white">
                    {category.title}
                  </h3>

                  <p className="text-sm text-white/80">
                    {category.count || 0} articles
                  </p>

                </div>

              </Link>

            ))}

          </div>
        </section>

        {/* TRENDING POSTS */}
        <section className="bg-secondary/30 py-16 md:py-24">

          <div className="mx-auto max-w-7xl px-4">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Latest Articles
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                  Trending on VelvetNest
                </h2>

              </div>

              <Link
                href="/blog"
                className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-accent md:flex"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            <div className="masonry-grid mt-12">

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
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">

          <div className="flex items-end justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Curated for You
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Amazon Finds
              </h2>

              <p className="mt-2 max-w-md text-muted-foreground">
                Affordable, stylish picks handpicked by me.
              </p>

            </div>

            <Link
              href="/amazon-finds"
              className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-accent md:flex"
            >
              Shop All
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          <div className="masonry-grid mt-12">

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

        {/* ABOUT SECTION */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div className="relative">

              <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">

                {about?.image && (
                  <Image
                    src={urlFor(about.image).width(1200).url()}
                    alt={about?.title || "About VelvetNest"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}

              </div>

            </div>

            <div className="space-y-6">

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                About VelvetNest
              </p>

              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {about?.title}
              </h2>

              <p className="text-lg text-muted-foreground">
                {about?.subtitle}
              </p>

              <p className="leading-relaxed text-muted-foreground">
                {about?.description}
              </p>

              <Button asChild variant="outline" size="lg">

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
