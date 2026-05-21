
          import { client } from "@/sanity/lib/client"

async function getPost(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title
    }`,
    { slug }
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {

  const post = await getPost(params.slug)

  return (
    <div
      style={{
        padding: "40px",
        fontSize: "30px",
      }}
    >
      {post?.title || "NO POST"}
    </div>
  )
}
