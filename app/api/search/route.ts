import { NextResponse } from "next/server"
import { searchPosts } from "@/lib/search"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const query = searchParams.get("q") || ""

  try {
    const posts = await searchPosts(query)

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    )
  }
}
