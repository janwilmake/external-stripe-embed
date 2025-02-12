"use client"

import { useCallback, useState } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
)

export default function ExamplePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [apiKey, setApiKey] = useState("")

  const fetchClientSecret = useCallback(async () => {
    if (!apiKey) {
      console.error("API key is required")
      return
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_SKYFIRE_ENV === "production"
        ? "https://api.skyfire.xyz"
        : "https://api-qa.skyfire.xyz"

    try {
      const response = await fetch(
        `${apiUrl}/v1/top-up/create-top-up-session`,
        {
          method: "POST",
          headers: {
            "skyfire-api-key": apiKey,
          },
        }
      )
      const data = await response.json()
      return data.clientSecret
    } catch (error) {
      console.error("Error fetching client secret:", error)
    }
  }, [apiKey])

  const options = {
    fetchClientSecret,
    onComplete: () => {
      console.log("onComplete")
      setIsModalOpen(false)
    },
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex gap-2">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Skyfire API Key"
          className="border rounded px-3 py-2"
        />
        <Button
          variant="default"
          onClick={() => setIsModalOpen(true)}
          disabled={!apiKey}
          className="font-semibold px-6 py-5 text-base flex items-center gap-2 hover:scale-105 transition-transform"
        >
          Top Up
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      )}
    </div>
  )
}
