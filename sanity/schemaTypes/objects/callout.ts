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
        "Examples: Pro Tip, Shop the Look, Best Finds, Editor’s Pick, Cozy Tip, Styling Advice",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
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
