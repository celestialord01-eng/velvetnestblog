export function parseChildren(children: any[] = []) {
  const spans: any = []

  for (const child of children) {
    // Plain text
    if (child.type === "text") {
      spans.push({
        _type: "span",
        text: child.value,
      })
    }

    // Bold
    if (child.type === "strong") {
      const text = child.children
        ?.map((c: any) => c.value || "")
        .join("")

      spans.push({
        _type: "span",
        text,
        marks: ["strong"],
      })
    }

    // Italic
    if (child.type === "emphasis") {
      const text = child.children
        ?.map((c: any) => c.value || "")
        .join("")

      spans.push({
        _type: "span",
        text,
        marks: ["em"],
      })
    }

    // Links
    if (child.type === "link") {
      const text = child.children
        ?.map((c: any) => c.value || "")
        .join("")

      const markKey = crypto.randomUUID()

      spans.push({
        _type: "span",
        text,
        marks: [markKey],
      })

      spans._markDefs = spans._markDefs || []

      spans._markDefs.push({
        _key: markKey,
        _type: "link",
        href: child.url,
      })
    }
  }

  return spans
}
