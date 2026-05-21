import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"

import { headingToId } from "@/lib/heading"

// Controls drop cap so it only appears once
let hasDropCap = false

const components: PortableTextComponents = {
  block: {
    normal: ({ children }: any) => {
      const text =
        typeof children?.[0] === "string"
          ? children[0]
          : ""

      // Skip affiliate disclaimer paragraphs
      const isAffiliateDisclosure =
        text.includes("affiliate links") ||
        text.includes("commission")

      const applyDropCap =
        !hasDropCap &&
        !isAffiliateDisclosure

      if (applyDropCap) {
        hasDropCap = true
      }

      return (
        <p
          className={`
            mb-6 md:mb-8
            text-[16px] md:text-[18px]
            leading-[1.85] md:leading-[1.95]
            tracking-[0.01em]
            text-stone-700
            first-line:text-stone-800

            ${applyDropCap ? "drop-cap" : ""}
          `}
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
            mt-14 md:mt-20
            mb-6 md:mb-8
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
            mt-14 md:mt-20
            mb-5 md:mb-6
            font-serif
            text-[30px]
            leading-tight
            font-semibold
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
            mt-10 md:mt-14
            mb-4 md:mb-5
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
          text-lg md:text-xl
          italic
          leading-8 md:leading-9
          text-stone-600
        "
      >
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul
        className="
          mb-6 md:mb-8
          ml-5 md:ml-6
          list-disc
          space-y-2 md:space-y-3
          text-[16px] md:text-[18px]
          leading-[1.85]
          text-stone-700
        "
      >
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol
        className="
          mb-6 md:mb-8
          ml-5 md:ml-6
          list-decimal
          space-y-2 md:space-y-3
          text-[16px] md:text-[18px]
          leading-[1.85]
          text-stone-700
        "
      >
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-1">{children}</li>
    ),

    number: ({ children }: any) => (
      <li className="pl-1">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-stone-900">
        {children}
      </strong>
    ),

    em: ({ children }: any) => (
      <em className="italic text-stone-600">
        {children}
      </em>
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
        <figure className="my-10 md:my-14 overflow-hidden rounded-[28px]">
          <Image
            src={value.asset.url}
            alt={value.alt || "Blog image"}
            width={1400}
            height={900}
            className="
              h-auto
              w-full
              rounded-[28px]
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
  // Reset drop cap for every article render
  hasDropCap = false

  return (
    <div
      className="
        mx-auto
        max-w-3xl
        px-6 md:px-0
      "
    >
      <PortableText
        value={value}
        components={components}
      />
    </div>
  )
}
