import { key } from "../helpers/key"

export function convertButton(data: {
  text?: string
  url?: string
}) {
  return {
    _key: key(),

    _type: "linkBlock",

    text: data.text || "",

    url: data.url || "",
  }
}
