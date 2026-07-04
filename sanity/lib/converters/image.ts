import { key } from "../helpers/key"

export function convertImage(node: any) {
  return {
    _key: key(),
    _type: "image",

    alt: node.alt || "",

    caption: node.title || "",

    asset: undefined,
  }
}
