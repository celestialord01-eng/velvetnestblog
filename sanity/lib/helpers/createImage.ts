import { key } from "./key"

export function createImage(
  assetRef: string,
  alt = "",
  caption = ""
) {
  return {
    _key: key(),
    _type: "image",

    asset: {
      _type: "reference",
      _ref: assetRef,
    },

    alt,

    caption,
  }
}
