# Case 2 — Single Payment: Pay with Card

## Goal

Verify a direct card payment (no saved token), for both fake-3DS outcomes.

## Preconditions

- App running, on the home screen.

## Steps

1. Tap **"Pay with Card"** under "Payments: → Single Payment" (there are two
   "Pay with Card" buttons on the home screen — this is the first one, under
   "Single Payment", not "Batch Payment").
   - Opens `bottomSheetRegularPayment` titled "Pay" (`paymentTitle`),
     amount **123.45 ₴**.
2. `mobile_list_elements_on_screen`. Fields (each with a unique identifier,
   unlike iOS):
   - `textFieldCardNumber` → child `EditText`
   - `textFieldExpDate` → child `EditText`
   - `textFieldCvv` → child `EditText`
3. Tap `textFieldCardNumber`, type `4242424242424242`.
4. **Re-run `mobile_list_elements_on_screen`** before tapping the next field
   — the keyboard may or may not have shifted the layout; don't assume.
5. Tap `textFieldExpDate`, type `0632`.
6. Tap `textFieldCvv`, type `123`.
7. Tap **`buttonPay`** ("Pay 123.45 ₴").
8. Wait ~3-5s. A "Test ACS Page" loads inside a `WebView`. **Its buttons are
   not exposed to `mobile_list_elements_on_screen`** (unlike iOS) — take a
   screenshot instead and tap by proportional coordinates: `CONFIRM` is
   roughly 57% down the screen, `Cancel` roughly 64% down, both horizontally
   centered.

## Branch A — tap CONFIRM (happy path)

Sheet closes. Native `AlertDialog` on home screen:
- Title: **"Payment Success"**
- Message: `Payment completed successfully. External ID: <externalId>, Payment ID: <paymentId>`
- Button: `OK`

## Branch B — tap Cancel (fake decline)

Sheet closes immediately (no in-sheet error/Try-Again screen — see the
Android gotcha in `../README.md`). Two things appear together:
- A native `AlertDialog`: Title **"Payment Failed"**, message
  `Payment failed: Transaction rejected.`, button `OK`.
- A `Snackbar` toast at the bottom: `Payment Failed: Transaction rejected. code = ...`
  (cosmetic duplicate, not a second failure — dismiss or ignore it).
