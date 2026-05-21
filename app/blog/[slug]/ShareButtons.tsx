"use client"

import {
  Pinterest,
  Facebook,
  Send,
  MessageCircle,
  Instagram,
  Link as LinkIcon,
  Check,
} from "lucide-react"

import { useState } from "react"

interface ShareButtonsProps {
  title: string
}

export default function ShareButtons({
  title,
}: ShareButtonsProps) {

  const [copied, setCopied] =
    useState(false)

  const url =
    typeof window !== "undefined"
      ? window.location.href
      : ""

  const encodedUrl =
    encodeURIComponent(url)

  const encodedTitle =
    encodeURIComponent(title)

  const shareLinks = [
    {
      name: "Pinterest",

      icon: (
        <Pinterest size={17} />
      ),

      href:
        `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    },

    {
      name: "Facebook",

      icon: (
        <Facebook size={17} />
      ),

      href:
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },

    {
      name: "WhatsApp",

      icon: (
        <MessageCircle size={17} />
      ),

      href:
        `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },

    {
      name: "Telegram",

      icon: (
        <Send size={17} />
      ),

      href:
        `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },

    {
      name: "Instagram",

      icon: (
        <Instagram size={17} />
      ),

      href:
        "https://instagram.com",
    },
  ]

  async function handleCopy() {

    try {

      await navigator.clipboard.writeText(
        url
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)

    } catch (error) {

      console.error(
        "Copy failed",
        error
      )
    }
  }

  return (

    <div className="flex flex-wrap items-center gap-3">

      {shareLinks.map(
        (item) => (

          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${item.name}`}
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#e4ddd4]
              bg-white
              text-[#3d342f]
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#cdb9a4]
              hover:bg-[#f8f3ee]
              hover:shadow-md
            "
          >

            <span
              className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              {item.icon}
            </span>

          </a>
        )
      )}

      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="
          group
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#e4ddd4]
          bg-white
          text-[#3d342f]
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#cdb9a4]
          hover:bg-[#f8f3ee]
          hover:shadow-md
        "
      >

        <span
          className="
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >

          {copied ? (
            <Check size={17} />
          ) : (
            <LinkIcon size={17} />
          )}

        </span>

      </button>

    </div>
  )
          }
