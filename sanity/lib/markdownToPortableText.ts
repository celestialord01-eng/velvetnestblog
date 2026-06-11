import { remark } from "remark"
import remarkParse from "remark-parse"

function parseChildren(children: any[] = []) {
  const spans: any = []

  for (const child of children) {
    // Plain text
    if (child.type === "text") {
      spans.push({
        _type: "span",
        text: child.value,
      })
    }

    // Bold
    if (child.type === "strong") {
      const text = child.children
        ?.map((c: any) => c.value || "")
        .join("")

      spans.push({
        _type: "span",
        text,
        marks: ["strong"],
      })
    }

    // Italic
    if (child.type === "emphasis") {
      const text = child.children
        ?.map((c: any) => c.value || "")
        .join("")

      spans.push({
        _type: "span",
        text,
        marks: ["em"],
      })
    }

    // Links
    if (child.type === "link") {
      const text = child.children
        ?.map((c: any) => c.value || "")
        .join("")

      const markKey = crypto.randomUUID()

      spans.push({
        _type: "span",
        text,
        marks: [markKey],
      })

      spans._markDefs = spans._markDefs || []

      spans._markDefs.push({
        _key: markKey,
        _type: "link",
        href: child.url,
      })
    }
  }

  return spans
}

export async function markdownToPortableText(
  markdown: string
) {
  const tree = remark()
    .use(remarkParse)
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