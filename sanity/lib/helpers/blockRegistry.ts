import { convertCallout } from "../converters/callout"
import { convertImage } from "../converters/image"
import { convertButton } from "../converters/button"
import { convertComparison } from "../converters/comparison"
import { convertMessageBox } from "../converters/messageBox"

export const blockRegistry = {

  callout: convertCallout,

  image: convertImage,

  button: convertButton,
  comparison: convertComparison,
  messageBox: convertMessageBox,

}
