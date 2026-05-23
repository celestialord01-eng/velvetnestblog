import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  ArrowLeft,
  Clock,
  Calendar,
  Pin,
  Globe,
  Send,
  MessageCircle,
  Camera,
  Link as LinkIcon,
} from "lucide-react"

import { PortableText } from "@portabletext/react"

import slugify from "slugify"
import readingTime from "reading-time"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReadingProgress } from "@/components/reading-progress"

import TableOfContents from "@/components/table-of-contents"
import MobileTOC from "@/components/mobile-toc"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
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
      "slug": slug.current
    }
  }
  `

  return await client.fetch(query, {
    slug,
  })
}

/* =========================================================
   HELPERS
========================================================= */

function headingToId(text: string) {
  return slugify(text, {
    lower: true,
    strict: true,
  })
}

function getTableOfContents(body: any[] = []) {
  return body
    .filter(
      (block) =>
        block?._type === "block" &&
        ["h2", "h3"].includes(block?.style)
    )
    .map((block) => {
      const text =
        block?.children
          ?.map((child: any) => child?.text || "")
          .join("") || ""

      return {
        text,
        level: block.style,
        id: headingToId(text),
      }
    })
}

function getPlainText(blocks: any[] = []) {
  return blocks
    .map((block) =>
      block?.children
        ?.map((child: any) => child?.text || "")
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
  const { slug } = await params

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

      url: `https://velvetnestblog.vercel.app/blog/${post.slug}`,

      images:
        post.mainImage?.asset?.url
          ? [
              {
                url: post.mainImage.asset.url,
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
          ? [post.mainImage.asset.url]
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
      <figure className="my-16">
        <div
          className="
            relative
            h-[340px]
            md:h-[640px]
            overflow-hidden
            rounded-[2.5rem]
          "
        >
          <Image
            src={urlFor(value).url()}
            alt={value?.alt || "Blog image"}
            fill
            className="object-cover"
          />
        </div>

        {value?.caption && (
          <figcaption
            className="
              mt-5
              text-center
              text-sm
              italic
              text-muted-foreground
            "
          >
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },

  block: {
    h2: ({ children }: any) => {
      const text =
        typeof children?.[0] === "string"
          ? children[0]
          : ""

      const id = headingToId(text)

      return (
        <h2
          id={id}
          className="
            scroll-mt-32
            mt-24
            mb-8
            font-serif
            text-[2.6rem]
            leading-[0.98]
            tracking-[-0.04em]
            text-foreground
            md:text-[4.5rem]
          "
        >
          {children}
        </h2>
      )
    },

    h3: ({ children }: any) => {
      const text =
        typeof children?.[0] === "string"
          ? children[0]
          : ""

      const id = headingToId(text)

      return (
        <h3
          id={id}
          className="
            scroll-mt-32
            mt-16
            mb-6
            font-serif
            text-[1.8rem]
            leading-[1]
            tracking-[-0.03em]
            text-foreground
            md:text-[2.5rem]
          "
        >
          {children}
        </h3>
      )
    },

    normal: ({ children }: any) => (
      <p
        className="
          mb-9
          text-[1.12rem]
          leading-[2.05]
          tracking-[-0.01em]
          text-[#4d433d]
          md:text-[1.2rem]
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
          my-14
          border-l-[3px]
          border-[#cbb29a]
          pl-6
          text-[1.3rem]
          italic
          leading-[2]
          text-[#5d5148]
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
          mb-12
          ml-6
          list-disc
          space-y-5
          text-[#4d433d]
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
          mb-12
          ml-6
          list-decimal
          space-y-5
          text-[#4d433d]
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
          leading-[2]
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
          leading-[2]
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
          text-[#9d7b5f]
          underline
          underline-offset-[5px]
          transition
          hover:opacity-70
        "
      >
        {children}
      </a>
    ),
  },
}

/* =========================================================
   SHARE BUTTONS
========================================================= */

function ShareButtons() {
  const shareLinks = [
    {
      icon: <Pin size={16} />,
      href: "#",
    },

    {
      icon: <Globe size={16} />,
      href: "#",
    },

    {
      icon: <MessageCircle size={16} />,
      href: "#",
    },

    {
      icon: <Send size={16} />,
      href: "#",
    },

    {
      icon: <Camera size={16} />,
      href: "https://instagram.com",
    },
  ]

  return (
    <div className="flex flex-wrap gap-4">
      {shareLinks.map(
        (item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-card
              text-foreground
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-md
            "
          >
            {item.icon}
          </a>
        )
      )}

      <button
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-card
          text-foreground
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-md
        "
      >
        <LinkIcon size={16} />
      </button>
    </div>
  )
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params

  const post =
    await getPost(slug)

  if (!post) {
    notFound()
  }

  const bodyContent =
    Array.isArray(post?.body)
      ? post.body
      : []

  const toc =
    getTableOfContents(
      bodyContent
    )

  const stats =
    readingTime(
      getPlainText(
        bodyContent
      )
    )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress />

      <Header />

      <main>

        {/* HERO */}

        <section className="border-b border-border">
          <div
            className="
              mx-auto
              max-w-7xl
              px-5
              py-20
              md:py-32
            "
          >

            <Link
              href="/blog"
              className="
                mb-12
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
                gap-20
                lg:grid-cols-[1fr_320px]
              "
            >

              {/* LEFT */}

              <div>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-5
                    text-sm
                    text-muted-foreground
                  "
                >

                  {post.category?.title && (
                    <span
                      className="
                        rounded-full
                        border
                        border-border
                        bg-card
                        px-4
                        py-1.5
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-foreground
                      "
                    >
                      {post.category.title}
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />

                    {post.publishedAt
                      ? new Date(
                          post.publishedAt
                        ).toDateString()
                      : "Recently Published"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />

                    {stats.text}
                  </div>

                </div>

                <h1
                  className="
                    mt-10
                    max-w-5xl
                    font-serif
                    text-[3rem]
                    leading-[0.95]
                    tracking-[-0.04em]
                    text-foreground
                    md:text-[5.8rem]
                  "
                >
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p
                    className="
                      mt-10
                      max-w-3xl
                      text-[1.2rem]
                      leading-[2]
                      text-[#5f534b]
                      md:text-[1.35rem]
                    "
                  >
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-12">
                  <ShareButtons />
                </div>

              </div>

              {/* DESKTOP TOC */}

              <aside className="hidden lg:block">

                <div
                  className="
                    sticky
                    top-28
                    rounded-[2rem]
                    border
                    border-border
                    bg-card/80
                    p-7
                    backdrop-blur
                  "
                >
                  <TableOfContents
                    items={toc}
                  />
                </div>

              </aside>

            </div>

          </div>

        </section>

        {/* FEATURED IMAGE */}

        {post.mainImage?.asset?.url && (
          <section className="py-12">
            <div
              className="
                mx-auto
                max-w-6xl
                px-5
              "
            >

              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[2.5rem]
                  md:aspect-[16/8]
                "
              >

                <Image
                  src={
                    post.mainImage.asset.url
                  }
                  alt={
                    post.mainImage?.alt ||
                    post.title
                  }
                  fill
                  priority
                  className="object-cover"
                />

              </div>

            </div>

          </section>
        )}

        {/* MOBILE TOC */}

        <div
          className="
            mx-auto
            max-w-2xl
            px-5
            lg:hidden
          "
        >
          <MobileTOC items={toc} />
        </div>

        {/* ARTICLE */}

        <section className="pb-32 pt-12">

          <div
            className="
              mx-auto
              max-w-7xl
              px-5
            "
          >

            <article className="mx-auto max-w-2xl">
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
