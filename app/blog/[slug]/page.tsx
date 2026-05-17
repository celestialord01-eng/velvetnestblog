    import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import { PortableText } from "@portabletext/react"

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
    "image": mainImage.asset->url,
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
    "image": mainImage.asset->url,
    "category": categories[0]->title
  }`

  return await client.fetch(query, {
    category,
    currentId,
  })
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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.image],
    },
  }
}

const portableTextComponents = {
  
types: {
  image: ({ value }: any) => (
    <div className="my-10 overflow-hidden rounded-2xl">
      <Image
        src={urlFor(value).width(1200).url()}
        alt={value.alt || "Blog image"}
        width={1200}
        height={800}
        className="h-auto w-full rounded-2xl object-cover"
      />
    </div>
  ),
},
  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-12 mb-6 text-4xl font-bold tracking-tight">
        {children}
      </h1>
    ),

    h2: ({ children }: any) => (
      <h2 className="mt-12 mb-6 text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),

    h3: ({ children }: any) => (
      <h3 className="mt-10 mb-4 text-2xl font-semibold">
        {children}
      </h3>
    ),

    normal: ({ children }: any) => (
      <p className="mb-6 text-lg leading-8 text-muted-foreground">
        {children}
      </p>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-4 border-primary pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 ml-6 list-disc space-y-3">
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol className="mb-6 ml-6 list-decimal space-y-3">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-lg leading-8 text-muted-foreground">
        {children}
      </li>
    ),

    number: ({ children }: any) => (
      <li className="text-lg leading-8 text-muted-foreground">
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
      <em className="italic">{children}</em>
    ),

    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4"
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

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
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
                5 min read
              </div>
            </div>
          </header>

          <div className="relative mx-auto aspect-[21/9] max-w-6xl overflow-hidden rounded-3xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <ShareButtons post={post} />

            <div className="mt-12">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>

            <div className="mt-16">
              <ShareButtons post={post} />
            </div>
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
                    image={relatedPost.image}
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
      </main>

      <Footer />
    </div>
  )
            }
