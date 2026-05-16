export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },

    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fashion', value: 'fashion' },
          { title: 'Outfit Ideas', value: 'outfit-ideas' },
          { title: 'Home Decor', value: 'home-decor' },
          { title: 'Beauty', value: 'beauty' },
          { title: 'Self Care', value: 'self-care' },
        ],
      },
    },

    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
    },

    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}
