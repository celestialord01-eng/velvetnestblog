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

      return `@@VELVET_BLOCK:${id}@@`
    }
  )

  return {
    markdown: content,
    blocks,
  }
}
