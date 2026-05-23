import { defineField, defineType } from "sanity"

export default defineType({
  name: "category",
  title: "Categories",
  type: "document",

  fields: [
    // CATEGORY NAME
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // SLUG
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: "title",
        maxLength: 96,
      },

      validation: (Rule) => Rule.required(),
    }),

    // CATEGORY DESCRIPTION
    defineField({
      name: "description",
      title: "Category Description",
      type: "text",
      rows: 4,

      description:
        "Short description for SEO and category hero sections.",
    }),

    // CATEGORY IMAGE
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",

      options: {
        hotspot: true,
      },

      validation: (Rule) => Rule.required(),

      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // SEO TITLE
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",

      description:
        "Optional SEO title for Google and Pinterest.",
    }),

    // SEO DESCRIPTION
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,

      description:
        "Optional SEO meta description.",
    }),

    // FEATURED CATEGORY
    defineField({
      name: "featured",
      title: "Featured Category",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      featured: "featured",
    },

    prepare(selection) {
      const { title, media, featured } = selection

      return {
        title: featured ? `⭐ ${title}` : title,
        media,
      }
    },
  },
})
