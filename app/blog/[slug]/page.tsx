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
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "30px",
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
  }}
/>
