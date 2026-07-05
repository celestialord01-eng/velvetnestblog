import { defineField, defineType } from "sanity"

export const callout = defineType({
  name: "callout",
  title: "Callout Box",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),

    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "url",
    }),
    defineField({
  name: "products",
  title: "Products",
  type: "array",
  of: [
    {
      type: "reference",
      to: [{ type: "amazonFind" }],
    },
  ],
}),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "text",
    },

    prepare({ title, subtitle }) {
      return {
        title: `✨ ${title || "Callout Box"}`,
        subtitle,
      }
    },
  },
})
