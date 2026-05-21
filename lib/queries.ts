export const allPostsQuery = `
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  category,
  featured,
  mainImage{
    asset->{
      url
    },
    alt
  }
}
`

export const categoryPostsQuery = `
*[_type == "post" && category == $slug] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  category,
  featured,
  mainImage{
    asset->{
      url
    },
    alt
  }
}
`

export const singlePostQuery = `
*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  category,
  seoTitle,
  seoDescription,
  pinterestTitle,
  pinterestDescription,
  tags,
  mainImage{
    asset->{
      url
    },
    alt
  }
}
`
