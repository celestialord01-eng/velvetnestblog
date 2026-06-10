"use client"

import { useFormValue, useClient } from "sanity"
import { Button, Stack } from "@sanity/ui"
import { markdownToPortableText } from "../lib/markdownToPortableText"

export default function MarkdownImportButton() {
  const client = useClient({ apiVersion: "2025-01-01" })

  const documentId = useFormValue(["_id"]) as string
  const markdown = useFormValue(["markdownImport"]) as string

  const handleConvert = async () => {
    if (!markdown || !documentId) {
      alert("Markdown Import field is empty")
      return
    }

    const body = await markdownToPortableText(markdown)

    await client
      .patch(documentId.replace(/^drafts\./, ""))
      .set({ body })
      .commit()

    alert("Markdown converted successfully")
  }

  return (
    <Stack space={3}>
      <Button
        text="Convert Markdown → Body"
        tone="primary"
        onClick={handleConvert}
      />
    </Stack>
  )
}
