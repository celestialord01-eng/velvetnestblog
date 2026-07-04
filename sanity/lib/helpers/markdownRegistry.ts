import { convertHeading } from "../converters/heading"
import { convertParagraph } from "../converters/paragraph"
import { convertQuote } from "../converters/quote"
import { convertList } from "../converters/list"
import { convertTable } from "../converters/table"
import { convertImage } from "../converters/image"

export const markdownRegistry = {
  heading: convertHeading,

  paragraph: convertParagraph,

  blockquote: convertQuote,

  list: convertList,

  table: convertTable,

  image: convertImage,
}
