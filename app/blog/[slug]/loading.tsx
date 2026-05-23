export default function Loading() {

  return (

    <main className="min-h-screen bg-[#f8f5f1]">

      {/* HERO */}

      <section className="border-b border-[#ece6de]">

        <div className="mx-auto max-w-7xl px-5 py-20">

          <div className="grid gap-16 lg:grid-cols-[1fr_300px]">

            <div>

              <div className="flex gap-4">

                <div className="h-8 w-28 animate-pulse rounded-full bg-[#e7ddd2]" />

                <div className="h-8 w-40 animate-pulse rounded-full bg-[#ece3d9]" />

              </div>

              <div className="mt-8 h-32 w-full max-w-4xl animate-pulse rounded-[2rem] bg-[#ede4da]" />

              <div className="mt-8 h-24 w-full max-w-3xl animate-pulse rounded-[2rem] bg-[#f1e8df]" />

            </div>

            <div className="hidden lg:block">

              <div className="rounded-[2rem] bg-white p-6">

                <div className="h-8 w-40 animate-pulse rounded-full bg-[#e7ddd2]" />

                <div className="mt-8 space-y-4">

                  {Array.from({ length: 5 }).map((_, i) => (

                    <div
                      key={i}
                      className="h-5 w-full animate-pulse rounded-full bg-[#f0e8df]"
                    />

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* IMAGE */}

      <section className="py-10">

        <div className="mx-auto max-w-6xl px-5">

          <div className="aspect-[16/9] animate-pulse rounded-[2.5rem] bg-[#e9dfd4]" />

        </div>

      </section>

      {/* ARTICLE */}

      <section className="pb-28 pt-10">

        <div className="mx-auto max-w-3xl px-5">

          <div className="space-y-8">

            {Array.from({ length: 12 }).map((_, i) => (

              <div
                key={i}
                className="h-6 w-full animate-pulse rounded-full bg-[#ece3d9]"
              />

            ))}

            <div className="h-80 animate-pulse rounded-[2rem] bg-[#ede4da]" />

            {Array.from({ length: 8 }).map((_, i) => (

              <div
                key={i}
                className="h-6 w-full animate-pulse rounded-full bg-[#f0e8df]"
              />

            ))}

          </div>

        </div>

      </section>

    </main>
  )
          }
