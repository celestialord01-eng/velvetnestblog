import { createBlock } from "../helpers/createBlock"
import { parseChildren } from "../helpers/parseChildren"

import type { List } from "../types"

export function convertList(
  node: List
) {
  const blocks = []

  for (const item of node.children) {
    const paragraph: any = item.children?.[0]

const parsed = parseChildren(
  paragraph?.children ?? []
)

    blocks.push({
      ...createBlock(
        "normal",
        parsed.children,
        parsed.markDefs
      ),

      listItem: node.ordered
        ? "number"
        : "bullet",

      level: 1,
    })
  }

  return blocks
}
