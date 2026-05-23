import { client } from "@/sanity/lib/client"

export async function searchPosts(query: string) {
  if (!query) return []

  const searchQuery = `
    *[
      _type == "post" &&
      (
        title match $search + "*" ||
        excerpt match $search + "*" ||
        pt::text(body) match $search + "*"
      )
    ][0...8]{
      _id,
      title,
      "slug": slug.current,
      excerpt
    }
  `

  return client.fetch(searchQuery, {
    search: query,
  })
}
