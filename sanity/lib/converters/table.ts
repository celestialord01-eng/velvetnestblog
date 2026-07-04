import { key } from "../helpers/key"
import { createTable } from "../helpers/createTable"
import { parseChildren } from "../helpers/parseChildren"

import type { Table } from "../types"

export function convertTable(
  node: Table
) {
  const rows = node.children.map((row: any) => ({
    _key: key(),
    _type: "tableRow",

    cells: row.children.map((cell: any) => {
      const parsed = parseChildren(cell.children)

      return {
        _key: key(),
        _type: "tableCell",

        align: "left",

        content: [
          {
            _key: key(),
            _type: "block",
            style: "normal",

            children: parsed.children,

            markDefs: parsed.markDefs,
          },
        ],
      }
    }),
  }))

  return createTable(rows)
}
