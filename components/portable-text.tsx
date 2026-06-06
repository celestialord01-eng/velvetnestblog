import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { PinterestSaveButton } from "@/components/pinterest-save-button"
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

      // Skip affiliate disclosures
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
            mb-7 md:mb-8
            text-[1.12rem] md:text-[1.22rem]
            leading-[1.95]
            tracking-[0.01em]
            text-stone-700
            first-line:text-stone-800
            antialiased

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
            scroll-mt-32
            mt-16 md:mt-24
            mb-8 md:mb-10
            font-serif
            text-[2.8rem]
            leading-[1.05]
            font-semibold
            tracking-[-0.03em]
            text-stone-900
            md:text-6xl
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
            scroll-mt-32
            mt-20 md:mt-28
            mb-6 md:mb-8
            font-serif
            text-[2.3rem]
            leading-[1.08]
            font-semibold
            tracking-[-0.03em]
            text-stone-900
            md:text-5xl
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
            mt-14 md:mt-16
            mb-4 md:mb-5
            font-serif
            text-[1.9rem]
            leading-[1.15]
            font-semibold
            tracking-tight
            text-stone-900
            md:text-[2.4rem]
          "
        >
          {children}
        </h3>
      )
    },

    h4: ({ children }: any) => {
      const text = children?.[0]
      const id = headingToId(text)

      return (
        <h4
          id={id}
          className="
            scroll-mt-24
            mt-10
            mb-4
            font-serif
            text-[1.45rem]
            font-semibold
            leading-tight
            text-stone-800
            md:text-3xl
          "
        >
          {children}
        </h4>
      )
    },

    blockquote: ({ children }: any) => (
      <blockquote
        className="
          relative
          my-12 md:my-14
          overflow-hidden
          rounded-[24px]
          border-l-2
          border-[#8d7b6a]
          bg-[#f6f2ec]
          px-6 py-7 md:px-8 md:py-9
          text-[1.08rem] md:text-[1.2rem]
          italic
          leading-[1.9]
          tracking-[0.01em]
          text-stone-700
          shadow-[0_8px_30px_rgba(0,0,0,0.03)]
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
          mb-8 md:mb-10
          ml-5 md:ml-6
          list-disc
          space-y-3 md:space-y-4
          text-[1.12rem] md:text-[1.18rem]
          leading-[1.95]
          text-stone-700
          marker:text-stone-500
        "
      >
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol
        className="
          mb-8 md:mb-10
          ml-5 md:ml-6
          list-decimal
          space-y-3 md:space-y-4
          text-[1.12rem] md:text-[1.18rem]
          leading-[1.95]
          text-stone-700
          marker:text-stone-500
        "
      >
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-1">
        {children}
      </li>
    ),

    number: ({ children }: any) => (
      <li className="pl-1">
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong
        className="
          font-semibold
          text-stone-900
        "
      >
        {children}
      </strong>
    ),

    em: ({ children }: any) => (
      <em
        className="
          italic
          text-stone-600
        "
      >
        {children}
      </em>
    ),

    link: ({ children, value }: any) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener sponsored"
        : undefined

      return (
        <Link
          href={value?.href || "#"}
          rel={rel}
          className="
            inline-block
            border-b
            border-[#8d7b6a]
            pb-[1px]
            font-medium
            text-stone-900
            no-underline
            transition-all
            duration-300
            hover:border-stone-900
            hover:text-[#8d7b6a]
            hover:opacity-90
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
        <figure
          className="
            group
            relative
            my-14 md:my-20
            overflow-hidden
            rounded-[30px]
          "
        >
          <PinterestSaveButton
            imageUrl={value.asset.url}
            description={value.caption || ""}
          />

          <div className="overflow-hidden rounded-[30px]">
            <Image
              src={value.asset.url}
              alt={value.alt || "VelvetNest blog image"}
              width={1400}
              height={1800}
              className="
                h-auto
                w-full
                rounded-[30px]
                object-cover
                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                transition-transform
                duration-700
                group-hover:scale-[1.02]
              "
            />
          </div>

          {value.caption && (
            <figcaption
              className="
                mt-5
                text-center
                text-sm
                italic
                tracking-wide
                text-stone-500
              "
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    callout: ({ value }: any) => {
      return (
        <div
          className="
            my-12
            rounded-[32px]
            border
            border-[#e1d7ca]
            bg-gradient-to-br
            from-[#f8f5f1]
            to-[#f1ebe3]
            px-8
            py-7
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          "
        >
          {value.title && (
            <h4
              className="
                mb-3
                font-serif
                text-[1.5rem]
                font-semibold
                tracking-tight
                text-stone-900
              "
            >
              ✨ {value.title}
            </h4>
          )}

          <p
            className="
              text-[1.08rem]
              leading-[1.9]
              tracking-[0.01em]
              text-stone-700
            "
          >
            {value.text}
          </p>
          {value.products?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {value.products.map((product: any, index: number) => (
                <span key={index}>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="
                      underline
                      underline-offset-4
                      transition
                      hover:text-stone-900
                    "
                  >
                    {product.name}
                  </a>

                  {index !== value.products.length - 1 && (
                    <span className="mx-2 text-stone-400">•</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      )
    },
  },
}

export function CustomPortableText({ value }: any) {
  // Reset drop cap for every article
  hasDropCap = false

  return (
    <div
      className="
        mx-auto
        max-w-[68ch]
        px-5 md:px-0
      "
    >
      <PortableText
        value={value}
        components={components}
      />
    </div>
  )
}
