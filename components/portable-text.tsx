import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { PinterestSaveButton } from "@/components/pinterest-save-button"
import { headingToId } from "@/lib/heading"
import Table from "@/components/portable-text/Table"
import MessageBox from "@/components/portable-text/MessageBox"

// Controls drop cap so it only appears once
let hasDropCap = false
function safeHeadingId(children: any) {
  const text = Array.isArray(children)
    ? children
        .map((child) =>
          typeof child === "string"
            ? child
            : child?.props?.children || ""
        )
        .join("")
    : String(children || "")

  return headingToId(text)
}
const components: PortableTextComponents = {
  block: {
normal: ({ children, value }: any) => {
      
const text =
  value?.children
    ?.map((child: any) => child.text)
    .join(" ") || ""

const lowerText = text.toLowerCase()

const isAffiliateDisclosure =
  lowerText.includes("affiliate") ||
  lowerText.includes("commission") ||
  lowerText.includes("amazon") ||
  lowerText.includes("trusted partners")

const applyDropCap =
  !hasDropCap &&
  !isAffiliateDisclosure &&
  text.trim().length > 20

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
      const id = safeHeadingId(children)
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
      const id = safeHeadingId(children)

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
      const id = safeHeadingId(children)

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
      const id = safeHeadingId(children)
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
  font-medium
  text-stone-900
  no-underline
  transition-all
  duration-300
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
    my-14 md:my-20
    rounded-[30px]
  "
>
  <div className="relative overflow-hidden rounded-[30px]">

    <PinterestSaveButton
      imageUrl={value.asset.url}
      description={value.caption || ""}
    />

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
    table: ({ value }: any) => {
  return <Table value={value} />
},
    messageBox: ({ value }: any) => (
  <MessageBox value={value} />
),
    linkBlock: ({ value }: any) => (
  <div className="my-10 flex justify-center">
    <a
      href={value.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-stone-900
        px-8
        py-4
        text-base
        font-medium
        text-white
        transition
        hover:opacity-90
      "
    >
      {value.text}
    </a>
  </div>
),
    comparison: ({ value }: any) => (
  <section className="my-14">
    {value.title && (
      <h3
        className="
          mb-8
          text-center
          font-serif
          text-[2rem]
          font-semibold
          tracking-tight
          text-stone-900
          md:text-[2.4rem]
        "
      >
        {value.title}
      </h3>
    )}

    <div className="grid gap-6 md:grid-cols-2">
      {/* Left Card */}
      <div
        className="
          rounded-[28px]
          border
          border-[#e7ddd0]
          bg-[#faf8f5]
          p-8
          shadow-[0_8px_24px_rgba(0,0,0,0.04)]
        "
      >
        <h4
          className="
            mb-4
            font-serif
            text-[1.5rem]
            font-semibold
            text-stone-900
          "
        >
          {value.leftTitle}
        </h4>

        <p
          className="
            text-[1.05rem]
            leading-8
            text-stone-700
          "
        >
          {value.leftText}
        </p>
      </div>

      {/* Right Card */}
      <div
        className="
          rounded-[28px]
          border
          border-[#e7ddd0]
          bg-[#faf8f5]
          p-8
          shadow-[0_8px_24px_rgba(0,0,0,0.04)]
        "
      >
        <h4
          className="
            mb-4
            font-serif
            text-[1.5rem]
            font-semibold
            text-stone-900
          "
        >
          {value.rightTitle}
        </h4>

        <p
          className="
            text-[1.05rem]
            leading-8
            text-stone-700
          "
        >
          {value.rightText}
        </p>
      </div>
    </div>
  </section>
),

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
