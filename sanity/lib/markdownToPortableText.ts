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
export async function markdownToPortableText(
  markdown: string
) {
  const tree = remark()
  .use(remarkParse)
  .use(remarkGfm)
  .parse(markdown)

  const blocks: any[] = []

  for (const node of tree.children) {
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

        
