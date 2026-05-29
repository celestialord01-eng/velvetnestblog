import { defineField, defineType } from "sanity"

export default defineType({
  name: "customImage",
  title: "Custom Image",
  type: "image",

  options: {
    hotspot: true,
  },

  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
defineField({
  name: "testField",
  title: "🚨 TEST FIELD 🚨",
  type: "string",
}),
    defineField({
      name: "layout",
      title: "Image Layout",
      type: "string",
      initialValue: "pinterest",

      options: {
        list: [
          {
            title: "Pinterest (2:3)",
            value: "pinterest",
          },
          {
            title: "Full Width",
            value: "fullWidth",
          },
        ],

        layout: "radio",
      },
    }),
  ],

  preview: {
    select: {
      title: "caption",
      media: "asset",
    },
  },
})
