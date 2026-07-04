import { key } from "../helpers/key"

export function convertCallout(data: {
  title?: string
  text?: string
  buttonText?: string
  buttonLink?: string
}) {
  return {
    _key: key(),
    _type: "callout",

    title: data.title || "",

    text: data.text || "",

    buttonText: data.buttonText || "",

    buttonLink: data.buttonLink || "",

    products: [],
  }
}
