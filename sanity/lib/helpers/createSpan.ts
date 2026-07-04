import { key } from "./key"

export function createSpan(
  text: string,
  marks: string[] = []
) {
  return {
    _key: key(),
    _type: "span",
    text,
    marks,
  }
}
