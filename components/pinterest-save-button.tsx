"use client"

import { FaPinterestP } from "react-icons/fa"

interface Props {
  imageUrl: string
  description: string
}

export function PinterestSaveButton({
  imageUrl,
  description,
}: Props) {
  const handleSave = () => {
    const url = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      window.location.href
    )}&media=${encodeURIComponent(
      imageUrl
    )}&description=${encodeURIComponent(description)}`

    window.open(url, "_blank")
  }

  return (
    <button
      onClick={handleSave}
      aria-label="Save to Pinterest"
      className="absolute top-3 left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#E60023] text-white shadow-lg transition hover:scale-110"
    >
      <FaPinterestP size={18} />
    </button>
  )
}
