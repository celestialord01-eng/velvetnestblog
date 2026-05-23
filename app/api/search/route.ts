import { NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q") || ""

    const posts = await client.fetch(`
      *[_type == "post"]{
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        category
      }
    `)

    const filteredPosts = posts.filter((post: any) => {
      const search = query.toLowerCase()

      return (
        post?.title?.toLowerCase().includes(search) ||
        post?.excerpt?.toLowerCase().includes(search) ||
        post?.category?.toLowerCase().includes(search)
      )
    })

    return NextResponse.json(filteredPosts)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    )
  }
}
