      "use client"

import Image from "next/image"
import Link from "next/link"

import { ExternalLink } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt?: string
  image?: string
  category?: string
  date?: string
  slug: string
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

  return (
    <article className="group">

      <Link
        href={`/blog/${slug}`}
        className="block"
      >

        <div className="
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-sm
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-2xl
        ">

          {/* IMAGE */}
          <div
            className={`
              relative
              overflow-hidden
              ${
                featured
                  ? "aspect-[4/5]"
                  : "aspect-[4/5]"
              }
            `}
          >

            <Image
              src={imageSrc}
              alt={title}
              fill
              priority={featured}
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                33vw
              "
            />

            {/* OVERLAY */}
            <div className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/50
              via-transparent
              to-transparent
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            " />

            {/* CATEGORY */}
            <div className="
              absolute
              left-4
              top-4
            ">

              <span className="
                rounded-full
                border
                border-white/20
                bg-white/90
                px-4
                py-1.5
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#2c2520]
                backdrop-blur-md
              ">
                {category || "Lifestyle"}
              </span>
            </div>

            {/* FEATURED BADGE */}
            {featured && (

              <div className="
                absolute
                right-4
                top-4
              ">

                <span className="
                  rounded-full
                  bg-[#2c2520]
                  px-4
                  py-1.5
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-white
                  shadow-lg
                ">
                  Featured
                </span>
              </div>
            )}

            {/* PINTEREST BUTTON */}
            <button
              type="button"
              aria-label="Save to Pinterest"
              className="
                absolute
                bottom-4
                right-4
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-[#2c2520]
                opacity-0
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-110
                group-hover:opacity-100
              "
              onClick={(e) => {

                e.preventDefault()

                const pinterestUrl =
                  `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.origin +
                        "/blog/" +
                        slug
                      : ""
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
              }}
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
          <div className="p-6">

            {/* META */}
            <div className="
              mb-4
              flex
              items-center
              justify-between
              gap-3
            ">

              <p className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#8b7d6b]
              ">
                {date || "Recently Published"}
              </p>

              {readingTime && (

                <span className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-[#8b7d6b]
                ">
                  {readingTime} min read
                </span>
              )}
            </div>

            {/* TITLE */}
            <h3 className="
              text-2xl
              font-semibold
              leading-tight
              tracking-tight
              text-[#2c2520]
              transition-colors
              duration-300
              group-hover:text-[#5f5246]
            ">
              {title}
            </h3>

            {/* EXCERPT */}
            {excerpt && (

              <p className="
                mt-4
                line-clamp-3
                leading-7
                text-[#6b6258]
              ">
                {excerpt}
              </p>
            )}

            {/* READ MORE */}
            <div className="mt-6">

              <span className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-[#2c2520]
                transition-all
                duration-300
                group-hover:gap-3
              ">
                Read Article →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

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

  return (
    <article className="group">

      <a
        href={link || "#"}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block"
      >

        <div className="
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-sm
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-2xl
        ">

          {/* PRODUCT IMAGE */}
          <div className="
            relative
            aspect-square
            overflow-hidden
          ">

            <Image
              src={imageSrc}
              alt={title}
              fill
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
            />

            {/* CATEGORY */}
            <div className="
              absolute
              left-4
              top-4
            ">

              <span className="
                rounded-full
                border
                border-white/20
                bg-white/90
                px-4
                py-1.5
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#2c2520]
                backdrop-blur-md
              ">
                {category || "Amazon Find"}
              </span>
            </div>

            {/* SHOP BUTTON */}
            <div className="
              absolute
              inset-x-4
              bottom-4
              translate-y-4
              opacity-0
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            ">

              <span className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#2c2520]
                py-3
                text-sm
                font-medium
                text-white
              ">
                Shop Now

                <ExternalLink className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5">

            <h3 className="
              line-clamp-2
              text-base
              font-medium
              leading-7
              text-[#2c2520]
              transition-colors
              duration-300
              group-hover:text-[#5f5246]
            ">
              {title}
            </h3>

            <div className="
              mt-4
              flex
              items-center
              gap-3
            ">

              {price && (

                <span className="
                  text-lg
                  font-semibold
                  text-[#2c2520]
                ">
                  {price}
                </span>
              )}

              {originalPrice && (

                <span className="
                  text-sm
                  text-[#8b7d6b]
                  line-through
                ">
                  {originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </article>
  )
        }
