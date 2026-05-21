import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"

import { headingToId } from "@/lib/heading"

const components: PortableTextComponents = {
  block: {
    normal: ({ children, index }: any) => {
      const isFirstParagraph = index === 0

      return (
        <p
          className={`mb-6 text-lg leading-8 text-muted-foreground ${
            isFirstParagraph
              ? `
                first-letter:float-left
                first-letter:mr-3
                first-letter:mt-1
                first-letter:text-6xl
                md:first-letter:text-8xl
                first-letter:font-serif
                first-letter:font-semibold
                first-letter:leading-[0.8]
                first-letter:text-foreground
              `
              : ""
          }`}
        >
          {children}
        </p>
      )
    },

    h1: ({ children }: any) => {
      const text = children?.[0]
      const id = headingToId(text)

      return (
        <h1
          id={id}
          className="
            scroll-mt-28
            mt-14
            mb-6
            font-serif
            text-4xl
            font-semibold
            tracking-tight
            text-foreground
            md:text-5xl
          "
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
          className="
            scroll-mt-28
            mt-14
            mb-5
            font-serif
            text-3xl
            font-semibold
            tracking-tight
            text-foreground
            md:text-4xl
          "
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
          className="
            scroll-mt-28
            mt-10
            mb-4
            font-serif
            text-2xl
            font-semibold
            tracking-tight
            text-foreground
            md:text-3xl
          "
        >
          {children}
        </h3>
      )
    },

    blockquote: ({ children }: any) => (
      <blockquote
        className="
          my-8
          border-l-4
          border-stone-300
          pl-6
          italic
          text-stone-600
        "
      >
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 ml-6 list-disc space-y-3 text-muted-foreground">
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol className="mb-6 ml-6 list-decimal space-y-3 text-muted-foreground">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-8">{children}</li>
    ),

    number: ({ children }: any) => (
      <li className="leading-8">{children}</li>
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

    link: ({ children, value }: any) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined

      return (
        <Link
          href={value?.href || "#"}
          rel={rel}
          className="
            font-medium
            text-foreground
            underline
            underline-offset-4
            transition-opacity
            hover:opacity-70
          "
        >
          {children}
        </Link>
      )
    },
  },

  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null

      return (
        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={value.asset.url}
            alt={value.alt || "Blog image"}
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
          />

          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export function CustomPortableText({ value }: any) {
  return (
    <div
      className="
        prose-neutral
        max-w-none
      "
    >
      <PortableText
        value={value}
        components={components}
      />
    </div>
  )
          }
