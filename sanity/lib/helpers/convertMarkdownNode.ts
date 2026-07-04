import { markdownRegistry } from "./markdownRegistry"

export function convertMarkdownNode(
  node: any
) {
  const converter =
    markdownRegistry[
      node.type as keyof typeof markdownRegistry
    ]

  if (!converter) {
    return null
  }

  return converter(node)
}
