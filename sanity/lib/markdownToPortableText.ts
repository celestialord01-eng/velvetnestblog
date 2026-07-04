import { remark } from "remark"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import { parseChildren } from "./helpers/parseChildren"

export async function markdownToPortableText(
  markdown: string
) {
  const tree = remark()
  .use(remarkParse)
  .use(remarkGfm)
  .parse(markdown)

  const blocks: any[] = []

  for (const node of tree.children) {
    // Headings
    if (node.type === "heading") {
      const children = parseChildren(node.children)

      blocks.push({
        _type: "block",
        style:
          node.depth === 2
            ? "h2"
            : node.depth === 3
            ? "h3"
            : node.depth === 4
            ? "h4"
            : "normal",
        children,
        markDefs: children._markDefs || [],
      })
    }
    // Tables
if (node.type === "table") {
  blocks.push({
    _type: "table",
    caption: "",
    hasHeader: true,
    rows: node.children.map((row: any) => ({
      _type: "tableRow",
      cells: row.children.map((cell: any) => ({
        _type: "tableCell",
        align: "left",
        content: [
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            children: parseChildren(cell.children),
          },
        ],
      })),
    })),
  })

  continue
}

    // Paragraphs
    if (node.type === "paragraph") {
      const children = parseChildren(node.children)

      blocks.push({
        _type: "block",
        style: "normal",
        children,
        markDefs: children._markDefs || [],
      })
    }

    // Quotes
    if (node.type === "blockquote") {
      const paragraph: any = node.children?.[0]

      const children = parseChildren(
        paragraph?.children || []
      )

      blocks.push({
        _type: "block",
        style: "blockquote",
        children,
        markDefs: children._markDefs || [],
      })
    }

    // Lists
    if (node.type === "list") {
      for (const item of node.children) {
        const paragraph: any = item.children?.[0]

        const children = parseChildren(
          paragraph?.children || []
        )

        blocks.push({
          _type: "block",
          listItem: node.ordered
            ? "number"
            : "bullet",
          level: 1,
          children,
          markDefs: children._markDefs || [],
        })
      }
    }
  }

  return blocks
}

        
