# Case 4 — Batch Payment: Pay with Card

## Goal

Verify batch payment via direct card entry, for both fake-3DS outcomes.
Structurally identical to [case 2](02-single-payment-card.md) (same field
identifiers, inside `bottomSheetBatchPayment` instead of
`bottomSheetRegularPayment`) — the only differences are the amount and the
alert copy, called out below.

## Preconditions

- App running, on the home screen. "Batch Payment" is visible without
  scrolling on a standard-height device in this app, but check
  `mobile_list_elements_on_screen` first — swipe up
  (`mobile_swipe_on_screen`, direction `up`) if it isn't.

## Steps

Same as [case 2](02-single-payment-card.md) steps 1-8, except:
- Tap **"Pay with Card"** under "Batch Payment" (the second "Pay with Card"
  button on the home screen).
- The sheet shows **223.45 ₴** instead of 123.45 ₴.
- Pay button label is `Pay 223.45 ₴` (still identifier `buttonPay`).

## Branch A — tap CONFIRM

Native `AlertDialog`:
- Title: **"Batch Payment Success"** (not "Payment Success")
- Message: `Batch Payment completed successfully. External ID: <batchExternalId>`
  — note: **no Payment ID** in the batch success message (unlike single
  payment), same as iOS.

## Branch B — tap Cancel

- Native `AlertDialog`: Title **"Batch Payment Failed"** (not "Payment
  Failed"), message `Batch Payment failed: Transaction rejected.`
- `Snackbar` toast with the same message (cosmetic duplicate).
- No in-sheet error/Try-Again screen (see Android gotcha in `../README.md`).
