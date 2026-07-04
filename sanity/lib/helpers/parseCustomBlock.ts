import { parseYaml } from "./parseYaml"

export function parseCustomBlock(
  markdown: string
) {
  return {

    type: "",

    properties: parseYaml(markdown),

    body: "",

  }
}
