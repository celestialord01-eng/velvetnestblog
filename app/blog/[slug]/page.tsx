import Image from "next/image"
import { PortableText } from "@portabletext/react"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body
    }`,
    { slug }
  )

  return (

    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >

      <h1
        style={{
          fontSize: "48px",
          marginBottom: "40px",
          fontWeight: "bold",
        }}
      >
        {post?.title}
      </h1>

      <PortableText
        value={post?.body}
        components={{
          types: {

            image: ({ value }: any) => (

              <div
                style={{
                  marginTop: "40px",
                  marginBottom: "40px",
                  position: "relative",
                  width: "100%",
                  height: "500px",
                }}
              >

                <Image
                  src={urlFor(value).url()}
                  alt={value?.alt || "blog"}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />

              </div>
            ),
          },

          block: {

            normal: ({ children }) => (

              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "2",
                  marginBottom: "30px",
                }}
              >
                {children}
              </p>
            ),

            h2: ({ children }) => (

              <h2
                style={{
                  fontSize: "36px",
                  marginTop: "60px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                {children}
              </h2>
            ),

            h3: ({ children }) => (

              <h3
                style={{
                  fontSize: "28px",
                  marginTop: "40px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                {children}
              </h3>
            ),
          },
        }}
      />

    </div>
  )
}
