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
  ],

  preview: {
    select: {
      title: "caption",
      media: "asset",
    },
  },
})
