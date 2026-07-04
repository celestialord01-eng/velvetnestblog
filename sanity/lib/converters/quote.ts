
import { createBlock } from "../helpers/createBlock"
import { parseChildren } from "../helpers/parseChildren"

export function convertQuote(node: any) {
  const paragraph = node.children?.[0]

  const parsed = parseChildren(
    paragraph?.children || []
  )

  return createBlock(
    "blockquote",
    parsed.children,
    parsed.markDefs
  )
}
