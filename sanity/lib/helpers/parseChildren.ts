import { key } from "./key"
import { createSpan } from "./createSpan"

function visit(
  node: any,
  marks: string[],
  spans: any[],
  markDefs: any[]
) {
  switch (node.type) {
    case "text":
      spans.push(
        createSpan(node.value, marks)
      )
      return

    case "strong":
      node.children?.forEach((child: any) =>
        visit(
          child,
          [...marks, "strong"],
          spans,
          markDefs
        )
      )
      return

    case "emphasis":
      node.children?.forEach((child: any) =>
        visit(
          child,
          [...marks, "em"],
          spans,
          markDefs
        )
      )
      return

    case "delete":
      node.children?.forEach((child: any) =>
        visit(
          child,
          [...marks, "strike"],
          spans,
          markDefs
        )
      )
      return

    case "inlineCode":
      spans.push(
        createSpan(
          node.value,
          [...marks, "code"]
        )
      )
      return

    case "link": {
      const markKey = key()

      markDefs.push({
        _key: markKey,
        _type: "link",
        href: node.url,
      })

      node.children?.forEach((child: any) =>
        visit(
          child,
          [...marks, markKey],
          spans,
          markDefs
        )
      )

      return
    }

    case "break":
      spans.push(
        createSpan("\n", marks)
      )
      return

    default:
      node.children?.forEach((child: any) =>
        visit(
          child,
          marks,
          spans,
          markDefs
        )
      )
  }
}

export function parseChildren(
  import type { PhrasingContent } from "../types"

children: PhrasingContent[] = []
) {
  const spans: any[] = []

  const markDefs: any[] = []

  children.forEach((child) =>
    visit(
      child,
      [],
      spans,
      markDefs
    )
  )

  return {
    children: spans,
    markDefs,
  }
}
