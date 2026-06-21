export function extractPortableText(blocks: any[] = []) {
  return blocks
    .filter((block) => block._type === "block")
    .map((block) =>
      block.children
        ?.map((child: any) => child.text)
        .join(" ")
    )
    .join(" ")
}

export function calculateSearchScore(
  post: any,
  query: string
) {
  const terms = query
    .toLowerCase()
    .trim()
    .split(/\s+/)

  let score = 0

  for (const term of terms) {
    if (
      post.title?.toLowerCase().includes(term)
    )
      score += 100

    if (
      post.tags?.some((tag: string) =>
        tag.toLowerCase().includes(term)
      )
    )
      score += 75

    if (
      post.category?.toLowerCase().includes(term)
    )
      score += 50

    if (
      post.excerpt?.toLowerCase().includes(term)
    )
      score += 25

    if (
      post.searchContent
        ?.toLowerCase()
        .includes(term)
    )
      score += 10
  }

  return score
}
