# Case 3 — Single Payment: Pay with Token

## Goal

Verify payment using a previously-saved card token (no card form), for both
fake-3DS outcomes.

## Preconditions

- App running, on the home screen.
- `Credentials.dev_test_card_token_1` (`example/src/config/Credentials.tsx`)
  must hold a valid token — see [case 1](01-tokenize-card.md) if unsure. If
  this case fails instantly with `Receiver info error`, the token is stale:
  rerun case 1, paste the fresh token into that constant, force-stop and
  relaunch the app (`adb shell am force-stop rozetkapaysdk.example` then
  `am start -n rozetkapaysdk.example/.MainActivity` — Metro fast refresh does
  not reliably pick up a config constant change).

## Steps

1. Tap **"Pay with Token"** under "Payments: → Single Payment" (first of the
   two "Pay with Token" buttons, under "Single Payment" not "Batch Payment").
2. No card entry form appears.

## Observed behavior

In every run during this test pass, tapping "Pay with Token" completed
**immediately with the `Payment Success` alert** — the 3DS challenge screen
never appeared, on both Confirm and "Cancel" attempts (there was nothing to
cancel). This may be frictionless/risk-based auth for a token that's already
completed a successful charge before, rather than an Android-specific rule —
don't hard-code an expectation either way:

- **If the 3DS screen does appear**, treat it exactly like
  [case 2](02-single-payment-card.md) Branches A/B.
- **If it doesn't**, just verify the final alert:
  - Title: **"Payment Success"**
  - Message: `Payment completed successfully. External ID: <externalId>, Payment ID: <paymentId>`
