import { parseYaml } from "./parseYaml"

export interface ParsedCustomBlock {
  type: string
  props: Record<string, any>
  body: string
}

const YAML_LINE = /^[A-Za-z0-9_-]+\s*:\s*.*$/

export function parseCustomBlock(text: string): ParsedCustomBlock {
  const lines = text.trim().split(/\r?\n/)

  const firstLine = lines.shift() ?? ""

  const match = firstLine.match(/^:::([A-Za-z0-9_-]+)\s*(.*)$/)

  const type = match?.[1] ?? ""
  const inlineMeta = (match?.[2] ?? "").trim()

  const metadata: string[] = []
  const body: string[] = []

  let readingBody = false

  for (const raw of lines) {
    const line = raw.trimEnd()

    // Old separator still supported
    if (!readingBody && line === "---") {
      readingBody = true
      continue
    }

    if (!readingBody) {
      // Blank line switches to body
      if (line.trim() === "") {
        readingBody = true
        continue
      }

      // YAML property
      if (YAML_LINE.test(line)) {
        metadata.push(line)
        continue
      }

      // Anything else starts body
      readingBody = true
    }

    body.push(raw)
  }

  let yamlText = metadata.join("\n")

  if (inlineMeta) {
    yamlText = inlineMeta + "\n" + yamlText
  }

  // Accept both key:value and key: value
  yamlText = yamlText.replace(
    /^([A-Za-z0-9_-]+):(?!\s)(.+)$/gm,
    "$1: $2"
  )

  return {
    type,
    props: parseYaml(yamlText),
    body: body.join("\n").trim(),
  }
}
