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

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.skyfire.xyz/v1/top-up/create-top-up-session",
        {
          method: "POST",
          headers: {
            "skyfire-api-key": process.env.NEXT_PUBLIC_SKYFIRE_API_KEY || "",
          },
        }
      )
      const data = await response.json()
      return data.clientSecret
    } catch (error) {
      console.error("Error fetching client secret:", error)
    }
  }, [])

  const options = {
    fetchClientSecret,
    onComplete: () => {
      console.log("onComplete")
      setIsModalOpen(false)
    },
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Button
        variant="default"
        onClick={() => setIsModalOpen(true)}
        className="font-semibold px-6 py-5 text-base flex items-center gap-2 hover:scale-105 transition-transform"
      >
        Top Up
      </Button>

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
