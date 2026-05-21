import type { Metadata } from "next"

import { notFound } from "next/navigation"

import { client } from "@/sanity/lib/client"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

/* =========================================================
   GET POST
========================================================= */

async function getPost(slug: string) {

  const query = `
  *[
    _type == "post" &&
    slug.current == $slug
  ][0]{

    _id,
    title,
    excerpt,
    publishedAt,
    body,

    featured,
    readingTime,
    tags,

    "slug": slug.current,

    seoTitle,
    seoDescription,

    pinterestTitle,
    pinterestDescription,

    mainImage{
      asset->{
        url
      },
      alt,
      caption
    },

    category->{
      title,
      "slug": slug.current,
      description,
      seoTitle,
      seoDescription
    }
  }
  `

  return await client.fetch(
    query,
    { slug }
  )
}

/* =========================================================
   SEO
========================================================= */

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {

  const post =
    await getPost(params.slug)

  if (!post) {

    return {
      title:
        "Post Not Found | VelvetNest",
    }
  }

  return {

    title:
      post.seoTitle ||
      `${post.title} | VelvetNest`,

    description:
      post.seoDescription ||
      post.excerpt,
  }
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {

  const { slug } = params

  const post =
    await getPost(slug)

  if (!post) {
    notFound()
  }

  return (

    <div className="min-h-screen bg-white p-10 text-black">

      <h1 className="text-5xl font-bold">
        ARTICLE PAGE WORKING
      </h1>

      <div className="mt-10 space-y-6">

        <div>

          <h2 className="text-2xl font-semibold">
            Slug
          </h2>

          <p className="mt-2">
            {slug}
          </p>

        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            Title
          </h2>

          <p className="mt-2">
            {post.title}
          </p>

        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            Excerpt
          </h2>

          <p className="mt-2">
            {post.excerpt}
          </p>

        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            Published Date
          </h2>

          <p className="mt-2">
            {post.publishedAt}
          </p>

        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            Category
          </h2>

          <p className="mt-2">
            {post.category?.title}
          </p>

        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            Main Image
          </h2>

          <p className="mt-2 break-all">
            {post.mainImage?.asset?.url}
          </p>

        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            Body Content
          </h2>

          <pre className="mt-4 overflow-auto rounded-2xl bg-black p-6 text-sm text-white">
            {JSON.stringify(
              post.body,
              null,
              2
            )}
          </pre>

        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            Full Post Object
          </h2>

          <pre className="mt-4 overflow-auto rounded-2xl bg-black p-6 text-sm text-white">
            {JSON.stringify(
              post,
              null,
              2
            )}
          </pre>

        </div>

      </div>

    </div>
  )
}
