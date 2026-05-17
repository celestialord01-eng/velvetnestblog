import { defineField, defineType } from "sanity"

export default defineType({
  name: "amazonFind",
  title: "Amazon Find",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),

    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "string",
    }),

    defineField({
      name: "affiliateLink",
      title: "Affiliate Link",
      type: "url",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),
  ],
})
