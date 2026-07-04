
import { createBlock } from "../helpers/createBlock"
import { parseChildren } from "../helpers/parseChildren"

import type { Heading } from "../types"

export function convertHeading(
  node: Heading
) {
  const parsed = parseChildren(node.children)

  let style = "normal"

  switch (node.depth) {
    case 1:
      style = "h1"
      break

    case 2:
      style = "h2"
      break

    case 3:
      style = "h3"
      break

    case 4:
      style = "h4"
      break

    default:
      style = "normal"
  }

  return createBlock(
    style,
    parsed.children,
    parsed.markDefs
  )
}
