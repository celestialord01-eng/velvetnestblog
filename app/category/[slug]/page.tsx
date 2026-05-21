import { notFound } from "next/navigation"

const categories = [
  "fashion",
  "outfit-ideas",
  "home-decor",
  "beauty",
  "self-care",
]

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!categories.includes(slug)) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f8f5f1] px-4 py-20">
      
      <div className="mx-auto max-w-6xl">

        <div className="mb-14 text-center">
          
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#8b7d6b]">
            VelvetNest Category
          </p>

          <h1 className="text-5xl font-semibold capitalize text-[#2c2520]">
            {slug.replace("-", " ")}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[#6b6258]">
            Explore curated articles, inspiration, and ideas from VelvetNest.
          </p>
        </div>

        {/* POSTS GRID */}
        <div>
          {/* Add your blog cards here */}
        </div>
      </div>
    </main>
  )
}
