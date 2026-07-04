import { defineType, defineField } from "sanity"

export default defineType({
  name: "messageBox",
  title: "Message Box",
  type: "object",

  fields: [
    defineField({
      name: "boxType",
      title: "Box Type",
      type: "string",

      initialValue: "tip",

      options: {
        layout: "dropdown",

        list: [
          { title: "Tip", value: "tip" },
          { title: "Note", value: "note" },
          { title: "Warning", value: "warning" },
          { title: "Success", value: "success" },
          { title: "Info", value: "info" },
        ],
      },
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "array",

      of: [
        {
          type: "block",
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      type: "boxType",
    },

    prepare({ title, type }) {
      return {
        title: title || "Message Box",
        subtitle: type,
      }
    },
  },
})
