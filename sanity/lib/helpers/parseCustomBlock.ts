import { parseYaml } from "./parseYaml"

export function parseCustomBlock(markdown: string) {
  const lines = markdown
    .split("\n")
    .map(line => line.trimEnd())

  const firstLine = lines.shift() || ""

  const type = firstLine.replace(":::", "").trim()

  const end = lines.lastIndexOf(":::")

  if (end !== -1) {
    lines.splice(end, 1)
  }

  const separator = lines.indexOf("---")

  let yamlText = ""
  let body = ""

  if (separator >= 0) {
    yamlText = lines.slice(0, separator).join("\n")
    body = lines.slice(separator + 1).join("\n").trim()
  } else {
    body = lines.join("\n").trim()
  }

  return {
    type,
    properties: parseYaml(yamlText),
    body,
  }
}
