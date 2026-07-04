import YAML from "yaml"

export function parseYaml(text: string) {
  try {
    return YAML.parse(text) || {}
  } catch (error) {
    console.error("YAML Parse Error:", error)
    return {}
  }
}
