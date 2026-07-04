
import { createBlock } from "../helpers/createBlock"
import { parseChildren } from "../helpers/parseChildren"

import type { Paragraph } from "../types"

export function convertParagraph(
  node: Paragraph
) {
  const parsed = parseChildren(node.children)

  return createBlock(
    "normal",
    parsed.children,
    parsed.markDefs
  )
}
