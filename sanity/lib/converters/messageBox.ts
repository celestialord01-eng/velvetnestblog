import { randomUUID } from "crypto"

export function convertMessageBox(data: {
  title?: string
  type?: string
  text?: string
}) {
  return {
    _type: "messageBox",

    boxType: data.type || "info",

    title: data.title || "",

    content: [
      {
        _type: "block",
        _key: randomUUID(),

        style: "normal",
        markDefs: [],

        children: [
          {
            _type: "span",
            _key: randomUUID(),

            text: data.text || "",
            marks: [],
          },
        ],
      },
    ],
  }
}
