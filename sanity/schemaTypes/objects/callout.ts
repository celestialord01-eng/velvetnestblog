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
      description:
        "Examples: Pro Tip, Shop the Look, Best Finds, Editor’s Pick",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "products",
      title: "Affiliate Products",
      type: "array",

      of: [
        {
          type: "object",

          fields: [
            defineField({
              name: "name",
              title: "Product Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "link",
              title: "Affiliate Link",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],

          preview: {
            select: {
              title: "name",
            },
          },
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
