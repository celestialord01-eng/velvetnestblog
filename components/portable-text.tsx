import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"

import { headingToId } from "@/lib/heading"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }: any) => {
  return (
    <p
      className="
        mb-8
        text-[18px]
        leading-[1.95]
        tracking-[0.01em]
        text-stone-700

        first-letter:float-left
        first-letter:mr-3
        first-letter:mt-1
        first-letter:text-6xl
        md:first-letter:text-8xl
        first-letter:font-serif
        first-letter:font-semibold
        first-letter:leading-[0.8]
        first-letter:text-stone-900
      "
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
            mt-16
            mb-8
            font-serif
            text-4xl
            font-semibold
            leading-tight
            tracking-tight
            text-stone-900
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
            mt-20
            mb-6
            font-serif
            text-3xl
            font-semibold
            leading-tight
            tracking-tight
            text-stone-900
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
            mt-14
            mb-5
            font-serif
            text-2xl
            font-semibold
            leading-tight
            tracking-tight
            text-stone-900
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
          my-10
          border-l-4
          border-stone-300
          pl-6
          text-xl
          italic
          leading-9
          text-stone-600
        "
      >
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-8 ml-6 list-disc space-y-4 text-stone-700">
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol className="mb-8 ml-6 list-decimal space-y-4 text-stone-700">
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
      <strong className="font-semibold text-stone-900">
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
            text-stone-900
            underline
            underline-offset-4
            transition-all
            duration-300
            hover:opacity-60
          "
        >
          {children}
        </Link>
      )
    },
  },

  types: {
    image: ({ value }: any) => {
      if (!value?.asset?.url) return null

      return (
        <figure className="my-12 overflow-hidden rounded-3xl">
          <Image
            src={value.asset.url}
            alt={value.alt || "Blog image"}
            width={1400}
            height={900}
            className="
              h-auto
              w-full
              rounded-3xl
              object-cover
              shadow-sm
            "
          />

          {value.caption && (
            <figcaption
              className="
                mt-4
                text-center
                text-sm
                italic
                text-stone-500
              "
            >
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
        mx-auto
        max-w-3xl
      "
    >
      <PortableText
        value={value}
        components={components}
      />
    </div>
  )
}
