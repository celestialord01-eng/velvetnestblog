import type { Metadata } from "next"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  ArrowLeft,
  Clock,
  Calendar,
} from "lucide-react"

import { PortableText } from "@portabletext/react"

import slugify from "slugify"
import readingTime from "reading-time"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import {
  BlogCard,
  ProductCard,
} from "@/components/cards"

import { ReadingProgress } from "@/components/reading-progress"



import BlogImage from "@/components/blog-image"

import FadeIn from "@/components/fade-in"

import ShareButtons from "./ShareButtons"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

/* =========================================================
   GET POST
========================================================= */

async function getPost(slug: string) {

  const query = `
  *[
    _type == "post" &&
    slug.current == $slug
  ][0]{

    _id,
    title,
    excerpt,
    publishedAt,
    body,

    featured,
    readingTime,
    tags,

    "slug": slug.current,

    seoTitle,
    seoDescription,

    pinterestTitle,
    pinterestDescription,

    mainImage{
      asset->{
        url
      },
      alt,
      caption
    },

    category->{
      title,
      "slug": slug.current,
      description,
      seoTitle,
      seoDescription,

      image{
        asset->{
          url
        }
      }
    }
  }
  `

  return await client.fetch(query, {
    slug,
  })
}

/* =========================================================
   TOC ID
========================================================= */

function headingToId(text: string) {

  return slugify(text, {
    lower: true,
    strict: true,
  })
}

/* =========================================================
   TABLE OF CONTENTS
========================================================= */

function getTableOfContents(
  body: any[] = []
) {

  return body
    .filter(
      (block) =>
        block?._type === "block" &&
        ["h2", "h3"].includes(block?.style)
    )
    .map((block) => {

      const text =
        block?.children
          ?.map(
            (child: any) =>
              child?.text || ""
          )
          .join("") || ""

      return {
        text,
        level: block.style,
        id: headingToId(text),
      }
    })
}

/* =========================================================
   PLAIN TEXT
========================================================= */

function getPlainText(
  blocks: any[] = []
) {

  return blocks
    .map((block) =>
      block?.children
        ?.map(
          (child: any) =>
            child?.text || ""
        )
        .join("") || ""
    )
    .join(" ")
}

/* =========================================================
   SEO
========================================================= */

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {

  const { slug } = params

  const post = await getPost(slug)

  if (!post) {

    return {
      title: "Post Not Found | VelvetNest",
    }
  }

  return {

    title:
      post.seoTitle ||
      `${post.title} | VelvetNest`,

    description:
      post.seoDescription ||
      post.excerpt,

    openGraph: {

      title: post.title,

      description:
        post.seoDescription ||
        post.excerpt,

      type: "article",

      url:
        `https://velvetnestblog.vercel.app/blog/${post.slug}`,

      images:
        post.mainImage?.asset?.url
          ? [
              {
                url:
                  post.mainImage.asset.url,

                width: 1200,
                height: 630,

                alt:
                  post.mainImage?.alt ||
                  post.title,
              },
            ]
          : [],
    },

    twitter: {

      card: "summary_large_image",

      title: post.title,

      description:
        post.seoDescription ||
        post.excerpt,

      images:
        post.mainImage?.asset?.url
          ? [
              post.mainImage.asset.url,
            ]
          : [],
    },

    alternates: {

      canonical:
        `https://velvetnestblog.vercel.app/blog/${post.slug}`,
    },
  }
}

/* =========================================================
   PORTABLE TEXT
========================================================= */

const portableTextComponents = {

  types: {

    image: ({ value }: any) => (

      <div className="my-14 overflow-hidden rounded-3xl">

        <BlogImage
          src={urlFor(value).width(1200).url()}
          alt={value.alt || "Blog image"}
        />

      </div>
    ),
  },

  block: {

    h1: ({ children }: any) => {

      const text =
        children?.[0] || ""

      const id =
        headingToId(text)

      return (

        <h1
          id={id}
          className="
            scroll-mt-28
            mt-12
            mb-6
            text-4xl
            font-bold
            tracking-tight
          "
        >
          {children}
        </h1>
      )
    },

    h2: ({ children }: any) => {

      const text =
        children?.[0] || ""

      const id =
        headingToId(text)

      return (

        <h2
          id={id}
          className="
            scroll-mt-28
            mt-16
            mb-8
            text-3xl
            font-semibold
            tracking-tight
            md:text-4xl
          "
        >
          {children}
        </h2>
      )
    },

    h3: ({ children }: any) => {

      const text =
        children?.[0] || ""

      const id =
        headingToId(text)

      return (

        <h3
          id={id}
          className="
            scroll-mt-28
            mt-12
            mb-5
            text-2xl
            font-semibold
            md:text-3xl
          "
        >
          {children}
        </h3>
      )
    },

    normal: ({ children }: any) => (

      <p
        className="
          mb-8
          text-[1.15rem]
          leading-9
          text-foreground/80
        "
      >
        {children}
      </p>
    ),

    blockquote: ({
      children,
    }: any) => (

      <blockquote
        className="
          my-10
          border-l-4
          border-primary
          pl-6
          text-xl
          italic
          leading-9
          text-foreground/70
        "
      >
        {children}
      </blockquote>
    ),
  },

  list: {

    bullet: ({
      children,
    }: any) => (

      <ul
        className="
          mb-8
          ml-6
          list-disc
          space-y-4
        "
      >
        {children}
      </ul>
    ),

    number: ({
      children,
    }: any) => (

      <ol
        className="
          mb-8
          ml-6
          list-decimal
          space-y-4
        "
      >
        {children}
      </ol>
    ),
  },

  listItem: {

    bullet: ({
      children,
    }: any) => (

      <li
        className="
          text-[1.1rem]
          leading-9
          text-foreground/80
        "
      >
        {children}
      </li>
    ),

    number: ({
      children,
    }: any) => (

      <li
        className="
          text-[1.1rem]
          leading-9
          text-foreground/80
        "
      >
        {children}
      </li>
    ),
  },

  marks: {

    strong: ({
      children,
    }: any) => (

      <strong
        className="
          font-semibold
          text-foreground
        "
      >
        {children}
      </strong>
    ),

    em: ({
      children,
    }: any) => (
      <em className="italic">
        {children}
      </em>
    ),

    link: ({
      children,
      value,
    }: any) => (

      <a
        href={value?.href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="
          font-medium
          text-primary
          underline
          underline-offset-4
          transition
          hover:opacity-80
        "
      >
        {children}
      </a>
    ),
  },
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {

  const { slug } = params

  const post =
    await getPost(slug)

  if (!post) {
    notFound()
  }

  const bodyContent =
    Array.isArray(post?.body)
      ? post.body
      : []

  

  const stats =
    readingTime(
      getPlainText(
        bodyContent
      )
    )

  const jsonLd = {

    "@context":
      "https://schema.org",

    "@type":
      "Article",

    headline:
      post.title,

    description:
      post.excerpt,

    image:
      post.mainImage?.asset?.url || "",

    datePublished:
      post.publishedAt,

    author: {

      "@type":
        "Organization",

      name:
        "VelvetNest",
    },
  }

  return (

    <div className="min-h-screen bg-background">

      <ReadingProgress />

      <Header />

      <main>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                jsonLd
              ),
          }}
        />

        {/* HERO */}

        <section
          className="
            border-b
            border-border
            bg-[#f7f4ef]
          "
        >

          <div
            className="
              mx-auto
              max-w-6xl
              px-4
              py-14
              md:py-20
            "
          >

            <Link
              href="/blog"
              className="
                mb-10
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-muted-foreground
                transition
                hover:text-foreground
              "
            >

              <ArrowLeft className="h-4 w-4" />

              Back to Blog
            </Link>

            <div
              className="
                grid
                gap-12
                lg:grid-cols-[1fr_320px]
              "
            >

              {/* CONTENT */}

              <div>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-4
                    text-sm
                    text-muted-foreground
                  "
                >

                  {post.category?.title && (

                    <span
                      className="
                        rounded-full
                        bg-[#ede7df]
                        px-4
                        py-1.5
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-[#2c2520]
                      "
                    >
                      {post.category.title}
                    </span>
                  )}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Calendar className="h-4 w-4" />

                    {post.publishedAt
                      ? new Date(
                          post.publishedAt
                        ).toDateString()
                      : "Recently Published"}
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Clock className="h-4 w-4" />

                    {stats.text}
                  </div>
                </div>

                <h1
                  className="
                    mt-8
                    text-4xl
                    font-bold
                    leading-tight
                    tracking-tight
                    md:text-6xl
                  "
                >
                  {post.title}
                </h1>

                {post.excerpt && (

                  <p
                    className="
                      mt-8
                      max-w-3xl
                      text-xl
                      leading-9
                      text-muted-foreground
                    "
                  >
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-8">

                  <ShareButtons
  post={{
    title: post.title,
    image:
      post.mainImage?.asset?.url || "",
  }}
/>
                </div>
              </div>

              
            </div>
          </div>
        </section>

        {/* FEATURED IMAGE */}

        {post.mainImage?.asset?.url && (

          <section className="py-10">

            <div
              className="
                mx-auto
                max-w-6xl
                px-4
              "
            >

              <div
                className="
                  overflow-hidden
                  rounded-[2rem]
                "
              >

                <div
                  className="
                    relative
                    aspect-[16/9]
                  "
                >

                  <Image
                    src={
                      post.mainImage
                        .asset.url
                    }
                    alt={
                      post.mainImage
                        ?.alt ||
                      post.title
                    }
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ARTICLE */}

        <section className="pb-24">

          <div
            className="
              mx-auto
              grid
              max-w-6xl
              gap-12
              px-4
              lg:grid-cols-[1fr_320px]
            "
          >

            <article
              className="
                prose
                prose-neutral
                max-w-none
              "
            >

              <PortableText
                value={bodyContent}
                components={
                  portableTextComponents
                }
              />
            </article>

            
          </div>
        </section>

      </main>

      <Footer />

    </div>
  )
    }
