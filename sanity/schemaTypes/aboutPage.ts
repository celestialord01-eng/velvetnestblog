import { defineField, defineType } from "sanity"

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
    }),

    defineField({
      name: "image",
      title: "About Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
})
