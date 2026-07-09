import { defineType, defineField } from "sanity"

export default defineType({
  name: "comparison",
  title: "Comparison",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "leftTitle",
      title: "Left Title",
      type: "string",
    }),

    defineField({
      name: "leftText",
      title: "Left Text",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "rightTitle",
      title: "Right Title",
      type: "string",
    }),

    defineField({
      name: "rightText",
      title: "Right Text",
      type: "text",
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: "title",
      left: "leftTitle",
      right: "rightTitle",
    },

    prepare({ title, left, right }) {
      return {
        title: title || "Comparison",
        subtitle: `${left || "Left"} vs ${right || "Right"}`,
      }
    },
  },
})
