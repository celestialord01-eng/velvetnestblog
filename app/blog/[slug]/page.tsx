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
import { ReadingProgress } from "@/components/reading-progress"

import TableOfContents from "@/components/table-of-contents"
import MobileTOC from "@/components/mobile-toc"
import ShareButtons from "./ShareButtons"
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
    featured,
    readingTime,
    tags,

    "slug": slug.current,

    seoTitle,
    seoDescription,

    pinterestTitle,
    pinterestDescription,

    body[]{
      ...,

      _type == "image" => {
        ...,
        asset->{
          url
        }
      },

      _type == "callout" => {
        ...,
        buttonText,
        buttonLink,
        
        products[]{
          name,
          link
        }
      }
    },

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
        block?.style === "h2"
    )
    .map((block) => {
      const text =
        block?.children
          ?.map((child: any) => child?.text || "")
          .join("") || ""

      return {
        text,
        level: "h2",
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
  customImage: ({ value }: any) => {
    const layout =
      value?.layout || "pinterest"

    if (layout === "fullWidth") {
      return (
        <figure className="my-16">
          <Image
            src={urlFor(value).url()}
            alt={value?.alt || "Blog image"}
            width={1200}
            height={800}
            className="
              w-full
              h-auto
              rounded-[2.5rem]
            "
          />

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
      )
    }

    return (
      <figure className="my-16">
        <div
          className="
            relative
            aspect-[2/3]
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
    )
  },

    callout: ({ value }: any) => (
      <div
        className="
          my-12
          rounded-[2rem]
          border
          border-[#e3d7ca]
          bg-[#f8f3ee]
          p-7
          shadow-sm
        "
      >
        {value?.title && (
          <h4
            className="
              mb-3
              font-serif
              text-2xl
              text-foreground
            "
          >
            ✨ {value.title}
          </h4>
        )}

        {value?.text && (
          <p
            className="
              text-[1.08rem]
              leading-[1.9]
              text-[#5b5148]
            "
          >
            {value.text}
          </p>
        )}
        {value?.buttonText && value?.buttonLink && (
  <div className="mt-6">
    <a
      href={value.buttonLink}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-stone-900
        px-6
        py-3
        text-sm
        font-medium
        text-white
        transition-all
        duration-300
        hover:opacity-90
        hover:scale-[1.02]
      "
    >
      {value.buttonText}
    </a>
  </div>
)}

        {value?.products?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {value.products.map(
              (product: any, index: number) => (
                <a
                  key={index}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="
                    rounded-full
                    border
                    border-border
                    bg-white
                    px-4
                    py-2
                    text-sm
                    transition
                    hover:bg-stone-100
                  "
                >
                  {product.name}
                </a>
              )
            )}
          </div>
        )}
      </div>
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
      return (
        <h3
          className="
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
   PAGE
========================================================= */

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params

  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const toc = getTableOfContents(post.body || [])

  const plainText = getPlainText(post.body || [])

  const stats = readingTime(plainText)

  return (
    <>
      <ReadingProgress />

      <Header />

      <main className="bg-[#fdfaf7]">
        <section className="border-b border-[#ece3da]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
            <Link
              href="/blog"
              className="
                mb-10
                inline-flex
                items-center
                gap-2
                text-sm
                text-muted-foreground
                transition
                hover:text-foreground
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
              <div>
                {post.category && (
                  <div className="mb-6">
                    <span
                      className="
                        rounded-full
                        bg-[#efe4d8]
                        px-4
                        py-2
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-[#7a5f49]
                      "
                    >
                      {post.category.title}
                    </span>
                  </div>
                )}

                <h1
                  className="
                    max-w-4xl
                    font-serif
                    text-[3.5rem]
                    leading-[0.95]
                    tracking-[-0.06em]
                    text-foreground
                    md:text-[6rem]
                  "
                >
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p
                    className="
                      mt-8
                      max-w-3xl
                      text-[1.2rem]
                      leading-[2]
                      text-[#5f554d]
                      md:text-[1.35rem]
                    "
                  >
                    {post.excerpt}
                  </p>
                )}

                <div
                  className="
                    mt-10
                    flex
                    flex-wrap
                    items-center
                    gap-6
                    text-sm
                    text-muted-foreground
                  "
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />

                    {new Date(
                      post.publishedAt
                    ).toLocaleDateString()}
                  </div>
                  <div className="mt-8">
  <ShareButtons title={post.title} />
</div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />

                    {Math.ceil(stats.minutes)} min read
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-32">
                  <TableOfContents items={toc} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {post.mainImage?.asset?.url && (
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2.5rem]
                  aspect-[16/9]
                "
              >
                <Image
                  src={post.mainImage.asset.url}
                  alt={
                    post.mainImage.alt ||
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

        <section className="pb-24 pt-8">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <div className="mb-14 lg:hidden">
              <MobileTOC items={toc} />
            </div>

            <article className="prose prose-neutral max-w-none">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </article>

            {post.tags?.length > 0 && (
              <div className="mt-20">
                <h3
                  className="
                    mb-5
                    font-serif
                    text-2xl
                  "
                >
                  Tags
                </h3>

                <div className="flex flex-wrap gap-3">
                  {post.tags.map(
                    (
                      tag: string,
                      index: number
                    ) => (
                      <span
                        key={index}
                        className="
                          rounded-full
                          border
                          border-border
                          bg-white
                          px-4
                          py-2
                          text-sm
                        "
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
    }
