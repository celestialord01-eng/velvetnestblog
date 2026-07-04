
import { createBlock } from "../helpers/createBlock"
import { parseChildren } from "../helpers/parseChildren"

import type { Blockquote } from "../types"

export function convertQuote(
  node: Blockquote
) {
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
