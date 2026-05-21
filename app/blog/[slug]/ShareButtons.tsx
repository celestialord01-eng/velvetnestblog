"use client"

import {
  Facebook,
  Link2,
  MessageCircle,
  Send,
} from "lucide-react"

interface ShareButtonsProps {
  post: {
    title?: string
    image?: string
  }
}

export default function ShareButtons({
  post,
}: ShareButtonsProps) {

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : ""

  const postTitle =
    post?.title || "VelvetNest"

  const postImage =
    post?.image || ""

  const openPopup = (
    url: string,
    width = 700,
    height = 600
  ) => {

    window.open(
      url,
      "_blank",
      `width=${width},height=${height}`
    )
  }

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(
        currentUrl
      )

      alert("Link copied!")

    } catch {

      alert("Failed to copy link")
    }
  }

  return (

    <div
      className="
        flex
        flex-wrap
        items-center
        gap-3
      "
    >

      {/* PINTEREST */}

      <button
        type="button"
        aria-label="Share on Pinterest"
        onClick={() => {

          const pinterestUrl =
            `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
              currentUrl
            )}&media=${encodeURIComponent(
              postImage
            )}&description=${encodeURIComponent(
              postTitle
            )}`

          openPopup(
            pinterestUrl,
            750,
            600
          )
        }}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#e5ddd3]
          bg-white
          text-[#2c2520]
          transition-all
          duration-300
          hover:bg-[#f5f0ea]
          hover:scale-105
        "
      >

        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      </button>

      {/* FACEBOOK */}

      <button
        type="button"
        aria-label="Share on Facebook"
        onClick={() => {

          const facebookUrl =
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`

          openPopup(
            facebookUrl,
            600,
            500
          )
        }}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#e5ddd3]
          bg-white
          text-[#2c2520]
          transition-all
          duration-300
          hover:bg-[#f5f0ea]
          hover:scale-105
        "
      >

        <Facebook className="h-5 w-5" />
      </button>

      {/* X / TWITTER */}

      <button
        type="button"
        aria-label="Share on X"
        onClick={() => {

          const twitterUrl =
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent(
              postTitle
            )}`

          openPopup(
            twitterUrl,
            600,
            450
          )
        }}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#e5ddd3]
          bg-white
          text-[#2c2520]
          text-lg
          font-bold
          transition-all
          duration-300
          hover:bg-[#f5f0ea]
          hover:scale-105
        "
      >
        X
      </button>

      {/* WHATSAPP */}

      <button
        type="button"
        aria-label="Share on WhatsApp"
        onClick={() => {

          const whatsappUrl =
            `https://wa.me/?text=${encodeURIComponent(
              `${postTitle} ${currentUrl}`
            )}`

          openPopup(
            whatsappUrl,
            600,
            500
          )
        }}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#e5ddd3]
          bg-white
          text-[#2c2520]
          transition-all
          duration-300
          hover:bg-[#f5f0ea]
          hover:scale-105
        "
      >

        <MessageCircle className="h-5 w-5" />
      </button>

      {/* TELEGRAM / INSTAGRAM STYLE */}

      <button
        type="button"
        aria-label="Share on Telegram"
        onClick={() => {

          const telegramUrl =
            `https://t.me/share/url?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent(
              postTitle
            )}`

          openPopup(
            telegramUrl,
            600,
            500
          )
        }}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#e5ddd3]
          bg-white
          text-[#2c2520]
          transition-all
          duration-300
          hover:bg-[#f5f0ea]
          hover:scale-105
        "
      >

        <Send className="h-5 w-5" />
      </button>

      {/* COPY LINK */}

      <button
        type="button"
        aria-label="Copy Link"
        onClick={handleCopy}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#e5ddd3]
          bg-white
          text-[#2c2520]
          transition-all
          duration-300
          hover:bg-[#f5f0ea]
          hover:scale-105
        "
      >

        <Link2 className="h-5 w-5" />
      </button>
    </div>
  )
          }
