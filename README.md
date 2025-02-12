# Stripe Payment Integration for Skyfire Account Top-Up

## Overview

This example shows how to implement a Stripe payment for topping up Skyfire accounts. The implementation uses the Stripe Embedded Checkout.

## Key Components

The main implementation is in the `stripe-payment-button.tsx` component, which handles:

- Fetching `clientSecret` from Skyfire API using API-Key
- Stripe Embedded Checkout integration

## Environment Setup

You'll need to configure two essential environment variables:

```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=stripe_public_key     # Contact us to get this key
NEXT_PUBLIC_SKYFIRE_API_KEY=your_skyfire_api_key    # Get this from your Skyfire Dashboard
```

## Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```
