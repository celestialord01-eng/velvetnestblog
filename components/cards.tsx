
"use client"

import Image from "next/image"
import Link from "next/link"

import {
  ExternalLink,
} from "lucide-react"

import {
  motion,
} from "framer-motion"

import {
  useState,
} from "react"

/* =========================================================
   BLOG CARD
========================================================= */

interface BlogCardProps {
  title: string
  excerpt?: string
  image?: string
  category?: string
  date?: string
  slug?: string
  featured?: boolean
  readingTime?: number
}

export function BlogCard({
  title,
  excerpt,
  image,
  category,
  date,
  slug,
  featured = false,
  readingTime,
}: BlogCardProps) {

  const imageSrc =
    image || "/placeholder.jpg"

  const [imageLoaded, setImageLoaded] =
    useState(false)

  const postUrl =
    slug && slug.length > 0
      ? `/blog/${slug}`
      : "/blog"

  /* =========================================================
     PINTEREST SHARE
  ========================================================= */

  const handlePinterestShare = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {

    e.preventDefault()
    e.stopPropagation()

    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${postUrl}`
        : ""

    const pinterestUrl =
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        shareUrl
      )}&media=${encodeURIComponent(
        imageSrc
      )}&description=${encodeURIComponent(
        title
      )}`

    window.open(
      pinterestUrl,
      "_blank",
      "width=750,height=600"
    )
  }

  return (

    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >

      <Link
        href={postUrl}
        className="block"
      >

        {/* IMAGE */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[2.2rem]
          "
        >

          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
            "
          >

            <Image
              src={imageSrc}
              alt={title}
              fill
              priority={featured}
              onLoad={() =>
                setImageLoaded(true)
              }
              className={`
                object-cover
                transition-all
                duration-[1400ms]
                ease-out
                group-hover:scale-[1.025]
                group-hover:-translate-y-1
                ${
                  imageLoaded
                    ? "scale-100 blur-0 opacity-100"
                    : "scale-105 blur-md opacity-0"
                }
              `}
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                33vw
              "
            />

            {/* LUXURY OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/[0.08]
                via-transparent
                to-transparent
                opacity-0
                transition-opacity
                duration-700
                group-hover:opacity-100
              "
            />

          </div>

          {/* CATEGORY */}

          <div
            className="
              absolute
              left-5
              top-5
            "
          >

            <span
              className="
                rounded-full
                bg-background/85
                px-4
                py-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-foreground
                backdrop-blur-md
              "
            >
              {category || "Lifestyle"}
            </span>

          </div>

          {/* FEATURED */}

          {featured && (

            <div
              className="
                absolute
                right-5
                top-5
              "
            >

              <span
                className="
                  rounded-full
                  bg-[#2d2723]
                  px-4
                  py-2
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  text-white
                "
              >
                Featured
              </span>

            </div>

          )}

          {/* PINTEREST BUTTON */}

          <button
            type="button"
            aria-label="Save to Pinterest"
            onClick={handlePinterestShare}
            className="
              absolute
              bottom-5
              right-5
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-background/90
              text-foreground
              shadow-lg
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-110
              md:translate-y-4
              md:opacity-0
              md:group-hover:translate-y-0
              md:group-hover:opacity-100
            "
          >

            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >

              <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />

            </svg>

          </button>

        </div>

        {/* CONTENT */}

        <div className="px-2 pb-2 pt-6">

          {/* META */}

          <div
            className="
              mb-4
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.24em]
                text-muted-foreground
              "
            >
              {date || "Recently Published"}
            </p>

            {readingTime && (

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.24em]
                  text-muted-foreground
                "
              >
                {readingTime} min read
              </span>

            )}

          </div>

          {/* TITLE */}

          <h3
            className="
              font-serif
              text-[2rem]
              leading-[1]
              tracking-[-0.04em]
              text-foreground
              transition
              duration-300
              group-hover:opacity-70
            "
          >
            {title}
          </h3>

          {/* EXCERPT */}

          {excerpt && (

            <p
              className="
                mt-5
                line-clamp-3
                text-[1rem]
                leading-8
                text-[#685d55]
              "
            >
              {excerpt}
            </p>

          )}

          {/* READ MORE */}

          <div className="mt-6">

            <span
              className="
                inline-flex
                items-center
                gap-2
                text-[12px]
                uppercase
                tracking-[0.18em]
                text-foreground
                transition-all
                duration-300
                group-hover:gap-3
              "
            >
              Read Article →
            </span>

          </div>

        </div>

      </Link>

    </motion.article>
  )
}

/* =========================================================
   PRODUCT CARD
========================================================= */

interface ProductCardProps {
  title: string
  price?: string
  originalPrice?: string
  image?: string
  link?: string
  category?: string
}

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  link,
  category,
}: ProductCardProps) {

  const imageSrc =
    image || "/placeholder.jpg"

  const [imageLoaded, setImageLoaded] =
    useState(false)

  return (

    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >

      <a
        href={link || "#"}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block"
      >

        {/* IMAGE */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
          "
        >

          <div
            className="
              relative
              aspect-square
              overflow-hidden
            "
          >

            <Image
              src={imageSrc}
              alt={title}
              fill
              onLoad={() =>
                setImageLoaded(true)
              }
              className={`
                object-cover
                transition-all
                duration-[1400ms]
                ease-out
                group-hover:scale-[1.025]
                group-hover:-translate-y-1
                ${
                  imageLoaded
                    ? "scale-100 blur-0 opacity-100"
                    : "scale-105 blur-md opacity-0"
                }
              `}
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
            />

            {/* OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/[0.08]
                via-transparent
                to-transparent
                opacity-0
                transition-opacity
                duration-700
                group-hover:opacity-100
              "
            />

          </div>

          {/* CATEGORY */}

          <div
            className="
              absolute
              left-4
              top-4
            "
          >

            <span
              className="
                rounded-full
                bg-background/90
                px-4
                py-2
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-foreground
                backdrop-blur-md
              "
            >
              {category || "Amazon Find"}
            </span>

          </div>

          {/* SHOP BUTTON */}

          <div
            className="
              absolute
              inset-x-4
              bottom-4
              translate-y-4
              opacity-0
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >

            <span
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#2c2623]
                py-3
                text-[11px]
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              Shop Now

              <ExternalLink className="h-4 w-4" />

            </span>

          </div>

        </div>

        {/* CONTENT */}

        <div className="px-2 pb-2 pt-5">

          <h3
            className="
              line-clamp-2
              font-serif
              text-[1.6rem]
              leading-[1.1]
              tracking-[-0.03em]
              text-foreground
              transition
              duration-300
              group-hover:opacity-70
            "
          >
            {title}
          </h3>

          <div
            className="
              mt-5
              flex
              items-center
              gap-3
            "
          >

            {price && (

              <span
                className="
                  text-[1.1rem]
                  font-medium
                  text-foreground
                "
              >
                {price}
              </span>

            )}

            {originalPrice && (

              <span
                className="
                  text-sm
                  text-muted-foreground
                  line-through
                "
              >
                {originalPrice}
              </span>

            )}

          </div>

        </div>

      </a>

    </motion.article>
  )
}
