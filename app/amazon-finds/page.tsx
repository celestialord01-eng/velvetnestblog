import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Star } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/cards"
import { Button } from "@/components/ui/button"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

export const metadata: Metadata = {
  title: "Amazon Finds | VelvetNest - Curated Affordable Picks",
  description:
    "Discover my favorite Amazon finds for fashion, home decor, and beauty.",
}

const filterCategories = [
  { label: "All", value: "all" },
  { label: "Fashion", value: "Fashion" },
  { label: "Home", value: "Home Decor" },
  { label: "Beauty", value: "Beauty" },
]

export default async function AmazonFindsPage() {
  // AMAZON FINDS
  const amazonFinds = await client.fetch(`
    *[_type == "amazonFind"] | order(featured desc, _createdAt desc){
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

  // FAVORITES
  const shopFavorites = await client.fetch(`
    *[_type == "amazonFind" && featured == true][0...4]{
      _id,
      title,
      price,
      affiliateLink,
      image,
      "category": category->title
    }
  `)

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">

              {/* LEFT */}
              <div className="text-center lg:text-left">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Curated Just for You
                </p>

                <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                  Amazon Finds
                </h1>

                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  My handpicked collection of affordable pieces that look
                  expensive. Updated weekly with fresh fashion, beauty,
                  and home decor finds.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm">
                  <Star
                    className="h-4 w-4 text-accent"
                    fill="currentColor"
                  />

                  <span>Updated every week with new finds</span>
                </div>
              </div>

              {/* RIGHT HERO IMAGES */}
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">

                  {amazonFinds.slice(0, 4).map((item: any) => (
                    <div
                      key={item._id}
                      className="group overflow-hidden rounded-xl"
                    >
                      {item.image?.asset && (
                        <div className="relative aspect-[3/4] bg-card">
                          <Image
                            src={urlFor(item.image)
                              .width(600)
                              .url()}
                            alt={item.title}
                            fill
                            className="
                              object-cover
                              transition-transform duration-500 ease-out
                              group-hover:scale-110
                            "
                            sizes="25vw"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* DISCLOSURE */}
        <section className="border-b border-border bg-muted/50 py-4">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Disclosure:</span>{" "}
              This page contains affiliate links. I may earn a small
              commission if you purchase through these links.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="sticky top-16 z-40 border-b border-border bg-background py-4 md:top-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">

              {filterCategories.map((category) => (
                <button
                  key={category.value}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    category.value === "all"
                      ? "border border-primary bg-primary text-primary-foreground"
                      : "border border-border hover:border-primary hover:bg-secondary"
                  }`}
                >
                  {category.label}
                </button>
              ))}

            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">

            <div className="masonry-grid">

              {amazonFinds.map((product: any) => (
                <ProductCard
                  key={product._id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={
                    product.image?.asset
                      ? urlFor(product.image).width(1000).url()
                      : "/placeholder.jpg"
                  }
                  link={product.affiliateLink}
                  category={product.category || "Amazon Find"}
                />
              ))}

            </div>

            {/* LOAD MORE */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Finds
              </Button>
            </div>

          </div>
        </section>

        {/* SHOP FAVORITES */}
        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">

            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Worth the Splurge
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Shop My Favorites
              </h2>

              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                My favorite quality pieces that are absolutely worth it.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {shopFavorites.map((item: any) => (
                <a
                  key={item._id}
                  href={item.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group"
                >
                  <div className="group overflow-hidden rounded-xl">

                    <div className="relative aspect-[3/4] bg-card">

                      {item.image?.asset && (
                        <Image
                          src={urlFor(item.image)
                            .width(1000)
                            .url()}
                          alt={item.title}
                          fill
                          className="
                            object-cover
                            transition-transform duration-500 ease-out
                            group-hover:scale-110
                          "
                          sizes="25vw"
                        />
                      )}

                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="w-full p-4 text-center">
                          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium">
                            Shop Now
                            <ExternalLink className="h-4 w-4" />
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div className="mt-4 text-center">

                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </span>

                    <h3 className="mt-2 font-medium transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-muted-foreground">
                      {item.price}
                    </p>

                  </div>
                </a>
              ))}

            </div>

          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-primary py-16 text-primary-foreground md:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center">

            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Get New Finds First
            </h2>

            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Subscribe to be the first to know about new Amazon finds,
              sales, and exclusive deals.
            </p>

            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">

              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border-0 bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                required
              />

              <Button variant="secondary" size="lg" type="submit">
                Subscribe
              </Button>

            </form>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
