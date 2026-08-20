# Case 5 — Batch Payment: Pay with Token

## Goal

Verify batch payment using a saved token, for both fake-3DS outcomes.

## Preconditions

- Same as [case 3](03-single-payment-token.md): a valid
  `Credentials.dev_test_card_token_1`.
- Scroll down to reach "Batch Payment" (`mobile_swipe_on_screen`, direction
  `up`).

## Steps

1. Tap **"Pay with Token"** under "Batch Payment" (second of the two "Pay
   with Token" buttons).
2. No card form — goes straight to the "Test ACS Page" 3DS challenge, amount
   **223.45 ₴**.

## Branch A — tap CONFIRM

Same as [case 4](04-batch-payment-card.md) Branch A: `Batch Payment Success`
alert, External ID only (no Payment ID).

## Branch B — tap Cancel

Same as [case 4](04-batch-payment-card.md) Branch B: in-place
`Transaction rejected.` error (External ID only) → tap `Cancel` →
`Batch Payment Failed` alert.
