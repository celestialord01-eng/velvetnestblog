import { defineField, defineType } from "sanity"

export const callout = defineType({
  name: "callout",
  title: "Callout Box",
  type: "object",

  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Pro Tip", value: "protip" },
          { title: "Note", value: "note" },
          { title: "Warning", value: "warning" },
        ],
      },
      initialValue: "protip",
    }),

    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
    }),
  ],

  preview: {
    select: {
      title: "text",
      subtitle: "type",
    },
  },
})
