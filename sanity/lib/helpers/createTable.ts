import { key } from "./key"

export function createTable(
  rows: any[],
  options?: {
    caption?: string
    hasHeader?: boolean
  }
) {
  return {
    _key: key(),
    _type: "table",

    caption: options?.caption ?? "",

    hasHeader: options?.hasHeader ?? true,

    rows,
  }
}
