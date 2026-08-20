# Case 4 — Batch Payment: Pay with Card

## Goal

Verify batch payment via direct card entry, for both fake-3DS outcomes.
Structurally identical to [case 2](02-single-payment-card.md) (same
`pay.*` identifiers) — the only differences are the amount and the
alert copy, called out below.

## Preconditions

- App running, on the home screen. You'll need to scroll down
  (`mobile_swipe_on_screen`, direction `up`) to reach the "Batch Payment"
  section.

## Steps

Same as [case 2](02-single-payment-card.md) steps 1-8, except:
- Tap **"Pay with Card"** under "Batch Payment" (the second "Pay with Card"
  button on the home screen).
- The sheet shows **223.45 ₴** instead of 123.45 ₴.
- Pay button label is `Pay 223.45 ₴` (still identifier `pay.cardPayButton`).

## Branch A — tap CONFIRM

Native alert:
- Title: **"Batch Payment Success"** (not "Payment Success")
- Body: `Batch Payment completed successfully. External ID: <batchExternalId>`
  — note: **no Payment ID** in the batch success message (unlike single
  payment).
- Button: `OK`

## Branch B — tap Cancel

1. In-place error screen (`pay.errorView`):
   - Message: `Transaction rejected., externalId: <batchExternalId>` (no
     paymentId here either).
   - Buttons: `Cancel`, `Try again`.
2. Tap `Cancel` → native alert:
   - Title: **"Batch Payment Failed"** (not "Payment Failed")
   - Body: `Batch Payment failed: Transaction rejected.`
   - A duplicate red snackbar/banner with the same message also briefly
     appears at the bottom of the screen — cosmetic, not a second failure.
