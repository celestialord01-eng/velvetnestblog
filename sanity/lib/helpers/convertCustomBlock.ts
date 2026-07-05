import { blockRegistry } from "./blockRegistry"

export function convertCustomBlock(block: {
  type: string
  properties: any
  body: string
}) {
  const converter =
    blockRegistry[
      block.type as keyof typeof blockRegistry
    ]

  if (!converter) {
    console.warn(
      `Unknown custom block: ${block.type}`
    )

    return null
  }

  const data = {
    ...block.properties,
  }

  if (block.body) {
    data.text = block.body
  }

  return converter(data)
}
