import { remark } from "remark"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import { parseChildren } from "./helpers/parseChildren"
import { convertHeading } from "./converters/heading"
import { convertParagraph } from "./converters/paragraph"
import { convertQuote } from "./converters/quote"
import { convertList } from "./converters/list"
import { convertTable } from "./converters/table"
export async function markdownToPortableText(
  markdown: string
) {
  const tree = remark()
  .use(remarkParse)
  .use(remarkGfm)
  .parse(markdown)

  const blocks: any[] = []

  for (const node of tree.children) {
    if (node.type === "heading") {
  blocks.push(convertHeading(node))
  continue
    }
    if (node.type === "table") {
  blocks.push(convertTable(node))
  continue
    }
    if (node.type === "paragraph") {
  blocks.push(convertParagraph(node))
  continue
    }

    if (node.type === "blockquote") {
  blocks.push(convertQuote(node))
  continue
    }

    if (node.type === "list") {
  blocks.push(
    ...convertList(node)
  )

  continue
    }
  }

  return blocks
}

        
