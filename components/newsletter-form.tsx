"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(
        "https://app.kit.com/forms/9530025/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email_address: email,
          }),
        }
      )

      if (response.ok) {
        setMessage(
          "✨ Thanks for subscribing! Check your inbox."
        )
        setEmail("")
      } else {
        setMessage(
          "Something went wrong. Please try again."
        )
      }
    } catch {
      setMessage(
        "Something went wrong. Please try again."
      )
    }

    setLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="
          mx-auto
          mt-10
          flex
          max-w-xl
          flex-col
          gap-4
          sm:flex-row
        "
      >
        <Input
          type="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter your email"
          className="
            h-14
            rounded-full
            border-border
            bg-card
            px-6
          "
        />

        <Button
          type="submit"
          disabled={loading}
          className="
            h-14
            rounded-full
            bg-[#2c2623]
            px-8
            text-white
          "
        >
          {loading
            ? "Joining..."
            : "Subscribe"}
        </Button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-[#6c6058]">
          {message}
        </p>
      )}
    </>
  )
                 }
