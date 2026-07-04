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

  return converter({
    ...block.properties,
    text: block.body,
  })
}
