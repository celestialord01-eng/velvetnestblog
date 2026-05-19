import { PortableText } from "@portabletext/react"
import { headingToId } from "@/lib/heading"

const components = {
  block: {
    h1: ({ children }: any) => {
      const text = children?.[0]
      const id = headingToId(text)

      return (
        <h1 id={id} className="scroll-mt-28 text-4xl font-bold mt-10 mb-6">
          {children}
        </h1>
      )
    },

    h2: ({ children }: any) => {
      const text = children?.[0]
      const id = headingToId(text)

      return (
        <h2 id={id} className="scroll-mt-28 text-3xl font-bold mt-10 mb-5">
          {children}
        </h2>
      )
    },

    h3: ({ children }: any) => {
      const text = children?.[0]
      const id = headingToId(text)

      return (
        <h3 id={id} className="scroll-mt-28 text-2xl font-semibold mt-8 mb-4">
          {children}
        </h3>
      )
    },
  },
}

export function CustomPortableText({ value }: any) {
  return <PortableText value={value} components={components} />
}
