export function convertComparison(data: any) {
  return {
    _type: "comparison",

    title: data.title,

    leftTitle: data.leftTitle,
    leftText: data.leftText,

    rightTitle: data.rightTitle,
    rightText: data.rightText,
  }
}
