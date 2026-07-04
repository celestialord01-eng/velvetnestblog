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
      name: "table",
      title: "Comparison Table",
      type: "table",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare({ title }) {
      return {
        title: title || "Comparison",
      }
    },
  },
})
