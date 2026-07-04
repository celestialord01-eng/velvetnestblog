import { convertCallout } from "../converters/callout"
import { convertImage } from "../converters/image"

export const blockRegistry = {
  callout: convertCallout,
  image: convertImage,
}
