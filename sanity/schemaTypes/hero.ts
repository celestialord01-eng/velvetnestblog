import { defineField, defineType } from "sanity"

export default defineType({
  name: "hero",
  title: "Homepage Hero",
  type: "document",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),

    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
    }),
  ],
})
