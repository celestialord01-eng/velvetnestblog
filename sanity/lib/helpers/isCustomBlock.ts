export function isCustomBlock(node: any) {
  if (node.type !== "paragraph") return false

  const text =
    node.children
      ?.map((child: any) => child.value || "")
      .join("")
      .trim() || ""

  return text.startsWith(":::")
}
