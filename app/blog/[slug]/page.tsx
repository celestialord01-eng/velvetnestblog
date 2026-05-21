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

      <figure className="my-14">

        <div
          className="
            relative
            h-[260px]
            md:h-[520px]
            overflow-hidden
            rounded-[2rem]
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
              mt-4
              text-center
              text-sm
              italic
              text-[#7a6d64]
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

      const id =
        headingToId(text)

      return (

        <h2
          id={id}
          className="
            scroll-mt-32
            mt-20
            mb-8
            font-serif
            text-[2rem]
            leading-tight
            tracking-tight
            text-[#1f1a17]
            md:text-5xl
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

      const id =
        headingToId(text)

      return (

        <h3
          id={id}
          className="
            scroll-mt-32
            mt-14
            mb-6
            font-serif
            text-2xl
            leading-tight
            tracking-tight
            text-[#1f1a17]
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
          text-[17px]
          leading-[2.2]
          text-[#4b4038]
          md:text-[19px]
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
          my-12
          border-l-4
          border-[#c9b7a3]
          pl-6
          text-xl
          italic
          leading-10
          text-[#5c5048]
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
          mb-10
          ml-6
          list-disc
          space-y-4
          text-[#4b4038]
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
          mb-10
          ml-6
          list-decimal
          space-y-4
          text-[#4b4038]
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
          text-[17px]
          leading-9
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
          text-[17px]
          leading-9
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
          text-[#1f1a17]
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
          text-[#8c6b4f]
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
              border-[#e4ddd4]
              bg-white
              text-[#3d342f]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#cdb9a4]
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
          border-[#e4ddd4]
          bg-white
          text-[#3d342f]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#cdb9a4]
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

    <div className="min-h-screen bg-[#f8f5f1]">

      <ReadingProgress />

      <Header />

      <main>

        {/* HERO */}

        <section className="border-b border-[#ebe4db]">

          <div
            className="
              mx-auto
              max-w-7xl
              px-5
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
                text-[#74675f]
                transition
                hover:text-black
              "
            >

              <ArrowLeft className="h-4 w-4" />

              Back to Blog

            </Link>

            <div
              className="
                grid
                gap-16
                lg:grid-cols-[1fr_300px]
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
                    text-[#74675f]
                  "
                >

                  {post.category?.title && (

                    <span
                      className="
                        rounded-full
                        border
                        border-[#ddd2c6]
                        bg-white
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
                    mt-8
                    max-w-4xl
                    font-serif
                    text-4xl
                    leading-tight
                    tracking-tight
                    text-[#1f1a17]
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
                      text-[20px]
                      leading-10
                      text-[#5b5048]
                    "
                  >
                    {post.excerpt}
                  </p>

                )}

                <div className="mt-10">

                  <ShareButtons />

                </div>

              </div>

              {/* DESKTOP TOC */}

              <aside className="hidden lg:block">

                <div
                  className="
                    sticky
                    top-28
                    rounded-3xl
                    border
                    border-[#e8dfd6]
                    bg-white
                    p-6
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

          <section className="py-10">

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
                  aspect-[16/9]
                  overflow-hidden
                  rounded-[2rem]
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
            max-w-3xl
            px-5
            lg:hidden
          "
        >

          <MobileTOC items={toc} />

        </div>

        {/* ARTICLE */}

        <section className="pb-28 pt-10">

          <div
            className="
              mx-auto
              grid
              max-w-7xl
              gap-16
              px-5
              lg:grid-cols-[minmax(0,1fr)_300px]
            "
          >

            <article
              className="
                max-w-3xl
              "
            >

              <PortableText
                value={bodyContent}
                components={
                  portableTextComponents
                }
              />

            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28" />
            </aside>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
    }
