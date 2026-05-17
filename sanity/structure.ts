import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("amazonFind").title("Amazon Finds"),
      S.documentTypeListItem("hero").title("Homepage Hero"),
      S.documentTypeListItem("aboutPage").title("About Page"),
    ])
