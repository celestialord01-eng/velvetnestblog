"use client"

import { useState } from "react"
import Image from "next/image"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

export default function BlogImage({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-zoom-in overflow-hidden rounded-3xl"
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-auto w-full rounded-3xl object-cover transition duration-300 hover:scale-[1.02]"
        />
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src }]}
      />
    </>
  )
}
