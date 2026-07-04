import { key } from "../helpers/key"

import type { Image } from "../types"

export function convertImage(
  node: Image
) {
  return {
    _key: key(),
    _type: "image",

    alt: node.alt || "",

    caption: node.title || "",

    asset: undefined,
  }
}
