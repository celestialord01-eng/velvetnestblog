import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import { PortableText } from "@portabletext/react"
import slugify from "slugify"
import readingTime from "reading-time"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard, ProductCard } from "@/components/cards"
import { amazonFinds } from "@/lib/data"
import ShareButtons from "./ShareButtons"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    excerpt,
    publishedAt,
    body,
    "slug": slug.current,
    mainImage,
    "category": categories[0]->title
  }`

  return await client.fetch(query, { slug })
}

async function getRelatedPosts(
  category: string,
  currentId: string
) {
  const query = `*[
    _type == "post" &&
    categories[0]->title == $category &&
    _id != $currentId
  ] | order(_createdAt desc)[0...3]{
    _id,
    title,
    excerpt,
    publishedAt,
    "slug": slug.current,
    mainImage,
    "category": categories[0]->title
  }`

  return await client.fetch(query, {
    category,
    currentId,
  })
}

function headingToId(text: string) {
  return slugify(text, {
    lower: true,
    strict: true,
  })
}

function getTableOfContents(body: any[]) {
  return body
    ?.filter(
      (block) =>
        block._type === "block" &&
        ["h2", "h3"].includes(block.style)
    )
    .map((block) => {
      const text = block.children
        .map((child: any) => child.text)
        .join("")

      return {
        text,
        level: block.style,
        id: headingToId(text),
      }
    })
}

function getPlainText(blocks: any[]) {
  return blocks
    ?.map((block) =>
      block.children
        ?.map((child: any) => child.text)
        .join("")
    )
    .join(" ")
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params

  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found | VelvetNest",
    }
  }

  return {
    title: `${post.title} | VelvetNest`,
    description: post.excerpt,
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-14 overflow-hidden rounded-3xl">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || "Blog image"}
          width={1200}
          height={800}
          className="h-auto w-full rounded-3xl object-cover"
        />
      </div>
    ),
  },

  block: {
    h1: ({ children }: any) => {
      const text = children?.[0]
      const id = headingToId(text)

      return (
        <h1
          id={id}
          className="scroll-mt-28 mt-12 mb-6 text-4xl font-bold tracking-tight"
        >
          {children}
        </h1>
      )
    },

    h2: ({ children }: any) => {
      const text = children?.[0]
      const id = headingToId(text)

      return (
        <h2
          id={id}
          className="scroll-mt-28 mt-16 mb-8 text-3xl font-semibold tracking-tight md:text-4xl"
        >
          {children}
        </h2>
      )
    },

    h3: ({ children }: any) => {
      const text = children?.[0]
      const id = headingToId(text)

      return (
        <h3
          id={id}
          className="scroll-mt-28 mt-12 mb-5 text-2xl font-semibold md:text-3xl"
        >
          {children}
        </h3>
      )
    },

    normal: ({ children }: any) => (
      <p className="mb-8 text-[1.15rem] leading-9 text-foreground/80">
        {children}
      </p>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="my-10 border-l-4 border-primary pl-6 text-xl italic leading-9 text-foreground/70">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-8 ml-6 list-disc space-y-4">
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol className="mb-8 ml-6 list-decimal space-y-4">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-[1.1rem] leading-9 text-foreground/80">
        {children}
      </li>
    ),

    number: ({ children }: any) => (
      <li className="text-[1.1rem] leading-9 text-foreground/80">
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),

    em: ({ children }: any) => (
      <em className="italic">
        {children}
      </em>
    ),

    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4 transition hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params

  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const toc = getTableOfContents(post.body)

  const stats = readingTime(
    getPlainText(post.body)
  )

  const relatedPosts = await getRelatedPosts(
    post.category,
    post._id
  )

  const relatedProducts = amazonFinds
    .filter((p) =>
      post.category === "Fashion"
        ? p.category === "fashion"
        : post.category === "Home Decor"
        ? p.category === "home"
        : post.category === "Beauty"
        ? p.category === "beauty"
        : true
    )
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <article>
          <header className="mx-auto max-w-4xl px-4 py-12 md:py-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mt-8">
              <span className="rounded-full border border-border bg-secondary px-4 py-1 text-xs font-medium uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-foreground/70 md:text-xl">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.publishedAt
                  ? new Date(post.publishedAt).toDateString()
                  : "No date"}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {Math.ceil(stats.minutes)} min read
              </div>
            </div>
          </header>

          <div className="relative mx-auto aspect-[21/9] max-w-6xl overflow-hidden rounded-3xl">
            <Image
              src={urlFor(post.mainImage).width(1400).url()}
              alt={post.title}
              width={1400}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_300px]">

            <div className="mx-auto max-w-2xl">
              <ShareButtons post={post} />

              <div className="mt-14">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>

              <div className="mt-20">
                <ShareButtons post={post} />
              </div>
            </div>

            <aside className="order-first lg:order-last">
              <div className="mb-10 rounded-3xl border border-border bg-secondary/30 p-6 lg:sticky lg:top-24">

                <h3 className="mb-5 text-lg font-semibold tracking-tight">
                  Table of Contents
                </h3>

                <ul className="space-y-1">
                  {toc.map((item: any) => (
                    <li
                      key={item.id}
                      className={
                        item.level === "h3"
                          ? "ml-4"
                          : ""
                      }
                    >
                      <a
                        href={`#${item.id}`}
                        className="
                          block rounded-xl px-3 py-2.5
                          text-sm leading-6 text-foreground/70
                          transition-all duration-200
                          hover:bg-background
                          hover:text-foreground
                        "
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>

        {relatedProducts.length > 0 && (
          <section className="border-t border-border bg-secondary/30 py-16">
            <div className="mx-auto max-w-7xl px-4">
              <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
                Shop the Look
              </h2>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((product) => (
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
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4">
              <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
                You Might Also Like
              </h2>

              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost: any) => (
                  <BlogCard
                    key={relatedPost._id}
                    title={relatedPost.title}
                    excerpt={relatedPost.excerpt}
                    image={relatedPost.mainImage}
                    category={relatedPost.category}
                    date={
                      relatedPost.publishedAt
                        ? new Date(
                            relatedPost.publishedAt
                          ).toDateString()
                        : "No date"
                    }
                    slug={relatedPost.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-secondary/20 p-8 md:p-12">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-2xl font-semibold">
                V
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                About VelvetNest
              </h3>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/70">
                VelvetNest shares elevated fashion inspiration,
                cozy home decor ideas, beauty trends, outfit
                inspiration, and curated Amazon finds designed
                for modern feminine living.
              </p>

            </div>

          </div>
        </section>

        <section className="border-t border-border bg-secondary/30 py-20">

          <div className="mx-auto max-w-3xl px-4 text-center">

            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Join VelvetNest ✨
            </h2>

            <p className="mt-5 text-lg leading-8 text-foreground/70">
              Get weekly outfit inspiration, cozy decor ideas,
              beauty trends, and curated Amazon finds delivered
              straight to your inbox.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  h-12 rounded-full border border-border
                  bg-background px-6 outline-none
                "
              />

              <button
                className="
                  h-12 rounded-full bg-primary
                  px-8 text-primary-foreground
                  transition hover:opacity-90
                "
              >
                Subscribe
              </button>

            </div>

          </div>

        </section>
      </main>

      <Footer />
    </div>
  )
            }
