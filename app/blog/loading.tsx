export default function Loading() {

  return (

    <main className="min-h-screen bg-[#f8f5f1]">

      {/* HERO */}

      <section className="border-b border-[#ece6de] py-28">

        <div className="mx-auto max-w-5xl px-5 text-center">

          <div className="mx-auto h-3 w-40 animate-pulse rounded-full bg-[#e7ddd2]" />

          <div className="mx-auto mt-8 h-24 w-full max-w-3xl animate-pulse rounded-[2rem] bg-[#ede4da]" />

          <div className="mx-auto mt-8 h-6 w-full max-w-2xl animate-pulse rounded-full bg-[#e7ddd2]" />

        </div>

      </section>

      {/* FEATURED */}

      <section className="mx-auto max-w-7xl px-5 py-24">

        <div className="grid gap-14 lg:grid-cols-2">

          <div className="aspect-[4/5] animate-pulse rounded-[2.5rem] bg-[#e9dfd4]" />

          <div className="flex flex-col justify-center">

            <div className="h-4 w-32 animate-pulse rounded-full bg-[#e7ddd2]" />

            <div className="mt-6 h-24 w-full animate-pulse rounded-[2rem] bg-[#ede4da]" />

            <div className="mt-8 h-32 w-full animate-pulse rounded-[2rem] bg-[#f0e8df]" />

            <div className="mt-10 h-12 w-40 animate-pulse rounded-full bg-[#e7ddd2]" />

          </div>

        </div>

      </section>

      {/* GRID */}

      <section className="border-t border-[#ece6de] bg-[#f4efe8]/40 py-24">

        <div className="mx-auto max-w-7xl px-5">

          <div className="masonry-grid">

            {Array.from({ length: 6 }).map((_, i) => (

              <div
                key={i}
                className="
                  mb-6
                  overflow-hidden
                  rounded-[2rem]
                  bg-white
                "
              >

                <div className="aspect-[4/5] animate-pulse bg-[#e9dfd4]" />

                <div className="p-6">

                  <div className="h-3 w-24 animate-pulse rounded-full bg-[#e7ddd2]" />

                  <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-[#ede4da]" />

                  <div className="mt-5 h-20 w-full animate-pulse rounded-2xl bg-[#f1e8df]" />

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  )
      }
