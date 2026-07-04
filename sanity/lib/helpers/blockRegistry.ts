import { convertCallout } from "../converters/callout"
import { convertImage } from "../converters/image"
import { convertButton } from "../converters/button"

export const blockRegistry = {

  callout: convertCallout,

  image: convertImage,

  button: convertButton,

}
