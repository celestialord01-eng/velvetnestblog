import { remark } from "remark"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import { parseChildren } from "./helpers/parseChildren"
import { convertHeading } from "./converters/heading"
import { convertParagraph } from "./converters/paragraph"
import { convertQuote } from "./converters/quote"
import { convertList } from "./converters/list"
import { convertTable } from "./converters/table"
import { convertImage } from "./converters/image"
import { markdownRegistry } from "./helpers/markdownRegistry"
import { convertMarkdownNode } from "./helpers/convertMarkdownNode"
import { extractText } from "./helpers/extractText"
import { parseCustomBlock } from "./helpers/parseCustomBlock"
import { convertCustomBlock } from "./helpers/convertCustomBlock"
export async function markdownToPortableText(
  markdown: string
) {
  const tree = remark()
  .use(remarkParse)
  .use(remarkGfm)
  .parse(markdown)

  const blocks: any[] = []

  for (const node of tree.children) {

  // Handle Velvet Nest custom blocks
  if (node.type === "paragraph") {

    const text = extractText(node).trim()

    if (text.startsWith(":::")) {

      const parsed = parseCustomBlock(text)

      const converted =
        convertCustomBlock(parsed)

      if (converted) {
        blocks.push(converted)
      }

      continue
    }
  }

  // Standard Markdown
  const converted =
    convertMarkdownNode(node)

  if (!converted) continue

  if (Array.isArray(converted)) {
    blocks.push(...converted)
  } else {
    blocks.push(converted)
  }
  }

  return blocks
}

        
