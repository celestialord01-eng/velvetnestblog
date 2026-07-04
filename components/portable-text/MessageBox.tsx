import { PortableText } from "@portabletext/react"

const styles = {
  tip: {
    icon: "💡",
    border: "border-amber-300",
    bg: "bg-amber-50",
    title: "text-amber-900",
  },

  note: {
    icon: "📝",
    border: "border-stone-300",
    bg: "bg-stone-50",
    title: "text-stone-900",
  },

  warning: {
    icon: "⚠️",
    border: "border-red-300",
    bg: "bg-red-50",
    title: "text-red-900",
  },

  success: {
    icon: "✅",
    border: "border-green-300",
    bg: "bg-green-50",
    title: "text-green-900",
  },

  info: {
    icon: "ℹ️",
    border: "border-blue-300",
    bg: "bg-blue-50",
    title: "text-blue-900",
  },
}

export default function MessageBox({
  value,
}: any) {
  const style =
    styles[value.boxType as keyof typeof styles] ||
    styles.note

  return (
    <div
      className={`my-10 rounded-2xl border p-6 ${style.border} ${style.bg}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">
          {style.icon}
        </span>

        <h4
          className={`font-semibold text-lg ${style.title}`}
        >
          {value.title || "Message"}
        </h4>
      </div>

      <PortableText value={value.content} />
    </div>
  )
}
