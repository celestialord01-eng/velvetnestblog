export default function Loading() {

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#f8f5f1]
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(221,206,189,0.35),transparent_70%)]
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          flex
          flex-col
          items-center
          text-center
        "
      >

        {/* LOGO */}

        <div
          className="
            relative
            flex
            h-20
            w-20
            items-center
            justify-center
          "
        >

          {/* OUTER RING */}

          <div
            className="
              absolute
              inset-0
              animate-spin
              rounded-full
              border
              border-[#d8cabd]
              border-t-[#8f7763]
              duration-[2500ms]
            "
          />

          {/* INNER DOT */}

          <div
            className="
              h-3
              w-3
              rounded-full
              bg-[#8f7763]
            "
          />

        </div>

        {/* BRAND */}

        <h2
          className="
            mt-8
            font-serif
            text-[2.8rem]
            tracking-[-0.06em]
            text-[#1f1a17]
          "
        >
          VelvetNest
        </h2>

        {/* TEXT */}

        <p
          className="
            mt-3
            text-[11px]
            uppercase
            tracking-[0.28em]
            text-[#8d7b6b]
          "
        >
          Curating Inspiration
        </p>

      </div>

    </div>
  )
}
