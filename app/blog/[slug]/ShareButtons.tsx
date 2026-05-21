      "use client"

import {
  FaPinterestP,
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
  FaInstagram,
  FaLink,
} from "react-icons/fa"

interface ShareButtonsProps {
  title: string
}

export default function ShareButtons({
  title,
}: ShareButtonsProps) {

  const url =
    typeof window !== "undefined"
      ? window.location.href
      : ""

  const shareLinks = [
    {
      icon: <FaPinterestP />,
      href: `https://pinterest.com/pin/create/button/?url=${url}`,
    },

    {
      icon: <FaFacebookF />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },

    {
      icon: <FaWhatsapp />,
      href: `https://api.whatsapp.com/send?text=${url}`,
    },

    {
      icon: <FaTelegramPlane />,
      href: `https://t.me/share/url?url=${url}`,
    },

    {
      icon: <FaInstagram />,
      href: "https://instagram.com",
    },
  ]

  return (
    <div className="flex flex-wrap gap-4">

      {shareLinks.map(
        (item, index) => (

          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
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
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#cdb9a4]
              hover:shadow-md
            "
          >
            <span className="text-[15px]">
              {item.icon}
            </span>
          </a>
        )
      )}

      <button
        onClick={() =>
          navigator.clipboard.writeText(url)
        }
        className="
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
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#cdb9a4]
          hover:shadow-md
        "
      >
        <FaLink />
      </button>

    </div>
  )
          }
