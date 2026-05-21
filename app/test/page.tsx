export default function TestPage() {

  return (

    <div
      style={{
        padding: "40px",
        fontSize: "30px",
      }}
    >

      <p>
        PROJECT ID:
      </p>

      <pre>
        {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
      </pre>

      <br />

      <p>
        DATASET:
      </p>

      <pre>
        {process.env.NEXT_PUBLIC_SANITY_DATASET}
      </pre>

      <br />

      <p>
        API VERSION:
      </p>

      <pre>
        {process.env.NEXT_PUBLIC_SANITY_API_VERSION}
      </pre>

    </div>
  )
        }
