# Case 3 — Single Payment: Pay with Token

## Goal

Verify payment using a previously-saved card token (no card form), for both
fake-3DS outcomes.

## Preconditions

- App running, on the home screen.
- `Credentials.dev_test_card_token_1` (`example/src/config/Credentials.tsx`)
  must hold a valid token — see [case 1](01-tokenize-card.md) if unsure. If
  this case fails instantly with `Receiver info error` and no 3DS screen, the
  token is stale: rerun case 1, paste the fresh token into that constant, and
  relaunch the app (`mobile_launch_app`).

## Steps

1. Tap **"Pay with Token"** under "Payments: → Single Payment" (first of the
   two "Pay with Token" buttons, under "Single Payment" not "Batch Payment").
2. No card entry form appears — it goes straight to the "Test ACS Page" 3DS
   challenge (same as case 2 step 8), amount **123.45 ₴**.

## Branch A — tap CONFIRM

Same as [case 2](02-single-payment-card.md) Branch A: `Payment Success` alert
with External ID + Payment ID.

## Branch B — tap Cancel

Same as [case 2](02-single-payment-card.md) Branch B: in-place
`Transaction rejected.` error → tap `Cancel` → `Payment Failed` alert.
