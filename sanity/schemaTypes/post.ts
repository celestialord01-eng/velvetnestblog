import { defineField, defineType } from "sanity"

export default defineType({
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    // TITLE
    defineField({
      name: "title",
      title: "Title",
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

    // EXCERPT
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      validation: (Rule) =>
        Rule.max(200).warning("Keep excerpt under 200 characters"),
    }),

    // PUBLISHED DATE
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    // CATEGORY REFERENCE
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    // FEATURED POST
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
      description:
        "Enable this to feature the article on homepage/category pages.",
    }),

    // MAIN IMAGE
    defineField({
      name: "mainImage",
      title: "Main Image",
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

        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),

    // PINTEREST TITLE
    defineField({
      name: "pinterestTitle",
      title: "Pinterest Title",
      type: "string",
      description: "Optimized title for Pinterest sharing.",
    }),

    // PINTEREST DESCRIPTION
    defineField({
      name: "pinterestDescription",
      title: "Pinterest Description",
      type: "text",
      rows: 3,
    }),

    // SEO TITLE
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Optional custom SEO title.",
    }),

    // SEO DESCRIPTION
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Optional custom meta description.",
    }),

    // TAGS
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",

      of: [{ type: "string" }],

      options: {
        layout: "tags",
      },
    }),

    // READING TIME
    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "number",
      description: "Optional manual reading time in minutes.",
    }),

    // BODY CONTENT
    defineField({
      name: "body",
      title: "Body",
      type: "array",

      of: [
        // TEXT BLOCKS
        {
          type: "block",

          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],

          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],

          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],

            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",

                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                  }),
                ],
              },
            ],
          },
        },

        // IMAGE BLOCK
        {
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
        },

        // CALLOUT BOX
        {
          type: "callout",
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
      category: "category.title",
      featured: "featured",
    },

    prepare(selection) {
      const { title, media, category, featured } = selection

      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category,
        media,
      }
    },
  },
})
