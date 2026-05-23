import slugify from "slugify"

export function headingToId(text: string) {
  return slugify(text, {
    lower: true,
    strict: true,
  })
    }
