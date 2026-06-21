
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
            rounded-[2rem]
          "
        >

          <div
  className="
    relative
    aspect-[3/2]
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
                bg-white/90
                border
                border-white/20
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
            
       </div>

        {/* CONTENT */}

        <div className="px-2 pb-2 pt-6">

          {/* META REMOVED FROM CATEGORY DESIGN 

          <div
            className="
              mb-4
              flex
              flex-wrap
              items-center
              gap-4
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

          </div> */}

          {/* TITLE */}

          <h3
            className="
              font-serif
              text-[1.5rem]
              md:text-[1.65rem]
              leading-[0.95]
              tracking-[-0.04em]
              text-foreground
              transition
              duration-300
              group-hover:text-[#b9914d]
            "
          >
            {title}
          </h3>

          {/* EXCERPT */}

          {excerpt && (

            <p
              className="
                mt-3
                line-clamp-2
                text-[0.95rem]
                leading-7
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
