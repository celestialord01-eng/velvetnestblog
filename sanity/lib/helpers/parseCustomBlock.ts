import { parseYaml } from "./parseYaml"

export interface ParsedCustomBlock {
  type: string
  props: Record<string, any>
  body: string
}

export function parseCustomBlock(text: string): ParsedCustomBlock {
  const lines = text.trim().split(/\r?\n/)

  const firstLine = lines.shift() ?? ""

  // Supports:
  // :::comparison
  // :::comparison title: Something
  const match = firstLine.match(/^:::([a-zA-Z0-9_-]+)\s*(.*)$/)

  const type = match?.[1] ?? ""
  const inlineMeta = (match?.[2] ?? "").trim()

  let yamlText = ""
  let body = ""

  const separator = lines.indexOf("---")

  if (separator >= 0) {
    yamlText = lines.slice(0, separator).join("\n")
    body = lines.slice(separator + 1).join("\n").trim()
  } else {
    yamlText = lines.join("\n")
  }

  // Merge inline metadata with multiline metadata
  if (inlineMeta) {
    yamlText = inlineMeta + "\n" + yamlText
  }

  // Normalize "key:value" → "key: value"
  yamlText = yamlText.replace(
    /^([A-Za-z0-9_-]+):(?!\s)(.+)$/gm,
    "$1: $2"
  )

  const props = parseYaml(yamlText)

  return {
    type,
    props,
    body,
  }
}
