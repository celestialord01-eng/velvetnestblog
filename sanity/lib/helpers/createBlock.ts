import { key } from "./key"

export function createBlock(
  style: string,
  children: any[],
  markDefs: any[] = []
) {
  return {
    _key: key(),
    _type: "block",
    style,
    children,
    markDefs,
  }
}
