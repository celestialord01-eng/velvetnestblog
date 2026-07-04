import { extractText } from "./extractText"

export function getBlockName(node: any) {
  const text = extractText(node).trim()

  return text
    .replace(":::", "")
    .trim()
}
