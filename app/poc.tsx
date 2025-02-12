"use client"

import { useState } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
)

export default function ExamplePage() {
  const [apiKey, setApiKey] = useState<string>("")
  const [topUpSessionToken, setTopUpSessionToken] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getTopUpSession = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        "https://api.skyfire.xyz/v1/top-up/create-top-up-session",
        {
          method: "POST",
          headers: {
            "skyfire-api-key": apiKey,
          },
        }
      )
      const data = await response.json()
      setTopUpSessionToken(data.clientSecret)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter API Key"
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={getTopUpSession}
          disabled={!apiKey || isLoading}
          className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
        >
          Get top-up session
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={topUpSessionToken}
          onChange={(e) => setTopUpSessionToken(e.target.value)}
          placeholder="TopUpSessionToken"
          className="p-2 border rounded flex-grow"
        />
      </div>

      {topUpSessionToken && !isLoading && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{
            clientSecret: topUpSessionToken,
          }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
      {isLoading && <div>Loading...</div>}
    </section>
  )
}
