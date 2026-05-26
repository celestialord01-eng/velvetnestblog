
import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const posts = await client.fetch(`
    *[_type == "post"]{
      "slug": slug.current,
      _updatedAt
    }
  `)

  const postUrls = posts.map((post: any) => ({
    url: `https://velvetnestblog.vercel.app/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://velvetnestblog.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },

    {
      url: 'https://velvetnestblog.vercel.app/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },

    {
      url: 'https://velvetnestblog.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    ...postUrls,
  ]
}
