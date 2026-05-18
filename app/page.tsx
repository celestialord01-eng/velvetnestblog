        import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard, ProductCard } from "@/components/cards"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { Button } from "@/components/ui/button"

import { blogPosts, amazonFinds, categories, shopFavorites } from "@/lib/data"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

export default async function HomePage() {
  const hero = await client.fetch(`
    *[_type == "hero"][0]
  `)

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              
              {/* Left Content */}
              <div className="animate-fade-up space-y-6 text-center lg:text-left">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {hero?.eyebrow}
                </p>

                <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  <span className="block">{hero?.title1}</span>
                  <span className="block">{hero?.title2}</span>
                  <span className="block text-accent">{hero?.title3}</span>
                </h1>

                <p className="mx-auto max-w-md text-lg leading-relaxed text-muted-foreground lg:mx-0">
                  {hero?.description}
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href={hero?.buttonLink || "/"}>
                      {hero?.buttonText}
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

              {/* Right Image */}
              <div className="relative animate-fade-in">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  {hero?.heroImage && (
                    <Image
                      src={urlFor(hero.heroImage).width(1000).url()}
                      alt="VelvetNest Hero"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                </div>

                {/* Floating cards */}
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-lg md:-left-8 md:p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Trending Now
                  </p>
                  <p className="mt-1 font-semibold">
                    Spring Capsule Wardrobe
                  </p>
                </div>

                <div className="absolute -right-4 top-8 rounded-xl bg-card p-4 shadow-lg md:-right-8 md:p-6">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-xs text-muted-foreground">
                    Curated Finds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
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
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog?category=${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-lg font-semibold text-primary-foreground">
                    {category.name}
                  </h3>

                  <p className="text-sm text-primary-foreground/80">
                    {category.count} articles
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Posts */}
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
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="masonry-grid mt-12">
              {blogPosts.slice(0, 6).map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  category={post.category}
                  date={post.date}
                  slug={post.slug}
                  featured={post.featured}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Amazon Finds */}
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
                Affordable, stylish picks handpicked by me. Updated weekly.
              </p>
            </div>

            <Link
              href="/amazon-finds"
              className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-accent md:flex"
            >
              Shop All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="masonry-grid mt-12">
            {amazonFinds.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                link={product.link}
                category={product.category}
              />
            ))}
          </div>
        </section>

        {/* About Preview */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                  alt="About VelvetNest"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                About VelvetNest
              </p>

              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Hi, I&apos;m So Glad You&apos;re Here
              </h2>

              <p className="leading-relaxed text-muted-foreground">
                Welcome to my cozy corner of the internet! I&apos;m passionate
                about helping women discover their personal style, create
                beautiful homes, and live more intentionally.
              </p>

              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  Read My Story <ArrowRight className="ml-2 h-4 w-4" />
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
