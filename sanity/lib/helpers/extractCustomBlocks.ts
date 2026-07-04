import { key } from "./key"

export interface CustomBlock {
  id: string
  raw: string
}

export function extractCustomBlocks(markdown: string) {
  const blocks: CustomBlock[] = []

  const content = markdown.replace(
    /:::([a-zA-Z0-9_-]+)[\s\S]*?:::/g,
    (match) => {
      const id = key()

      blocks.push({
        id,
        raw: match,
      })

      return `__VELVET_BLOCK_${id}__`
    }
  )

  return {
    markdown: content,
    blocks,
  }
}
