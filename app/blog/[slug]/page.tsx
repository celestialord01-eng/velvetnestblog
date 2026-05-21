export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  return (
    <div
      style={{
        padding: "40px",
        fontSize: "32px",
      }}
    >
      BLOG SLUG PAGE WORKING:
      <br />
      {slug}
    </div>
  )
}
