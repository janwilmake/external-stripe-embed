# Stripe Payment Integration for Skyfire Account Top-Up

## Overview

This example shows how to implement a Stripe payment for topping up Skyfire accounts. The implementation uses the Stripe Embedded Checkout.

## Key Components

The main implementation is in the `stripe-payment-button.tsx` component, which handles:

- Fetching `clientSecret` from Skyfire API
- Stripe Embedded Checkout integration

## Environment Setup

You'll need to configure one environment variable:

```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=stripe_public_key     # Contact us to get this key
```

## Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

> **Note:** When using your Skyfire API Key, ensure it is never exposed in publicly accessible locations like client-side code.
