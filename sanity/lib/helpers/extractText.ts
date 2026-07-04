export function extractText(node: any) {
  return (
    node.children
      ?.map((child: any) => child.value || "")
      .join("") || ""
  )
}
