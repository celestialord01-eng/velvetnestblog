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
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            text: data.text || "",
            marks: [],
          },
        ],
      },
    ],
  }
    }
