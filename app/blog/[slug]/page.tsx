import { client } from "@/sanity/lib/client"

interface Props {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {

  const query = `
  *[
    _type == "post" &&
    slug.current == $slug
  ][0]{
    title,
    excerpt
  }
  `

  return await client.fetch(
    query,
    { slug }
  )
}

export default async function BlogPostPage({
  params,
}: Props) {

  const post =
    await getPost(params.slug)

  return (

    <div
      style={{
        padding: "40px",
      }}
    >

      <h1
        style={{
          fontSize: "50px",
          fontWeight: "bold",
        }}
      >
        {post?.title}
      </h1>

      <p
        style={{
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        {post?.excerpt}
      </p>

    </div>
  )
}
