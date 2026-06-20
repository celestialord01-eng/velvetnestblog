import { defineField, defineType } from "sanity"
import MarkdownImportButton from "./MarkdownImportButtom"
export default defineType({
  name: "post",
  title: "Post",
  type: "document",

  fields: [
   defineField({
  name: "markdownBody",
  title: "Markdown Body",
  type: "markdown",
}),
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

    // CATEGORY
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    // FEATURED
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
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
    }),

    // SEO DESCRIPTION
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),

    // TAGS
    defineField({
  name: "tags",
  title: "Tags",
  type: "array",
  of: [{ type: "string" }],
}),

    // READING TIME
    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "number",
    }),
defineField({
    name: "markdownImport",
      title: "Markdown Import",
        type: "text",
          rows: 25,
          }),
    
defineField({
  name: "markdownConvert",
  title: "Convert Markdown",
  type: "string",
  components: {
    input: MarkdownImportButton,
  },
}),
    // BODY
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
          },
        },

// Image Block
{
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
},
        // LINK BLOCK
        {
          name: "linkBlock",
          title: "Link Button",
          type: "object",

          fields: [
            defineField({
              name: "text",
              title: "Link Text",
              type: "string",
            }),

            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],

          preview: {
            select: {
              title: "text",
              subtitle: "url",
            },
          },
        },

        // CALLOUT
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
