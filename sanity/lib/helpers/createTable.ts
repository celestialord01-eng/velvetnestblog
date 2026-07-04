import { key } from "./key"

export function createTable(rows: any[]) {
  return {
    _key: key(),
    _type: "table",
    caption: "",
    hasHeader: true,
    rows,
  }
}
