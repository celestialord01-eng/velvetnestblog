
import { createBlock } from "../helpers/createBlock"
import { parseChildren } from "../helpers/parseChildren"

export function convertParagraph(node: any) {
  const parsed = parseChildren(node.children)

  return createBlock(
    "normal",
    parsed.children,
    parsed.markDefs
  )
}
