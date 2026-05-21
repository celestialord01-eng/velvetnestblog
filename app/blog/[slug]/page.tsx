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
      excerpt
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
          marginBottom: "20px",
        }}
      >
        {post?.title}
      </h1>

      <p
        style={{
          fontSize: "22px",
        }}
      >
        {post?.excerpt}
      </p>
    </div>
  )
}
