import { PortableText } from "@portabletext/react"
import { client } from "@/sanity/lib/client"

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
        <img
          src={value?.asset?._ref || ""}
          alt="blog"
        />
      ),
    },
  }}
/>
