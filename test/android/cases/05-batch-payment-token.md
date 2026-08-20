# Case 5 — Batch Payment: Pay with Token

## Goal

Verify batch payment using a saved token, for both fake-3DS outcomes.

## Preconditions

- Same as [case 3](03-single-payment-token.md): a valid
  `Credentials.dev_test_card_token_1`.
- Scroll/verify "Batch Payment" is visible (see [case 4](04-batch-payment-card.md)).

## Steps

1. Tap **"Pay with Token"** under "Batch Payment" (second of the two "Pay
   with Token" buttons).
2. No card form.

## Observed behavior

Same as [case 3](03-single-payment-token.md): in every run here, this
completed immediately with the `Batch Payment Success` alert — no visible
3DS challenge. Don't assume this always holds; if a 3DS screen does appear,
treat it like [case 4](04-batch-payment-card.md) Branches A/B. Otherwise
just verify:

- Title: **"Batch Payment Success"**
- Message: `Batch Payment completed successfully. External ID: <batchExternalId>`
