export const allPostsQuery = `
*[_type == "post"] 
| order(featured desc, publishedAt desc){

  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  featured,
  readingTime,
  tags,

  category->{
    title,
    slug
  },

  mainImage{
    asset->{
      url
    },
    alt,
    caption
  }
}
`

export const categoryPostsQuery = `
*[
  _type == "post" &&
  category->slug.current == $slug
]
| order(publishedAt desc)
[$start...$end]{

  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  featured,
  readingTime,

  category->{
    title,
    slug
  },

  mainImage{
    asset->{
      url
    },
    alt,
    caption
  }
}
`
export const categoryCountQuery = `
count(
  *[
    _type == "post" &&
    category->slug.current == $slug
  ]
)
`
export const singlePostQuery = `
*[
  _type == "post" &&
  slug.current == $slug
][0]{

  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  featured,
  readingTime,
  tags,

  seoTitle,
  seoDescription,

  pinterestTitle,
  pinterestDescription,

  category->{
    title,
    slug,
    description,
    seoTitle,
    seoDescription,
    image{
      asset->{
        url
      }
    }
  },

  mainImage{
    asset->{
      url
    },
    alt,
    caption
  }
}
`

export const featuredPostsQuery = `
*[
  _type == "post" &&
  featured == true
]
| order(publishedAt desc){

  _id,
  title,
  slug,
  excerpt,
  publishedAt,

  category->{
    title,
    slug
  },

  mainImage{
    asset->{
      url
    },
    alt
  }
}
[0...4]
`

export const relatedPostsQuery = `
*[
  _type == "post" &&
  category->slug.current == $category &&
  slug.current != $slug
]
| order(publishedAt desc){

  _id,
  title,
  slug,
  excerpt,

  mainImage{
    asset->{
      url
    },
    alt
  },

  category->{
    title,
    slug
  }
}
[0...3]
`
