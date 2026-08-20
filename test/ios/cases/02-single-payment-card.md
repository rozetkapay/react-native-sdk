# Case 2 — Single Payment: Pay with Card

## Goal

Verify a direct card payment (no saved token), for both fake-3DS outcomes.

## Preconditions

- App running, on the home screen.

## Steps

1. Tap **"Pay with Card"** under "Payments: → Single Payment" (there are two
   "Pay with Card" buttons on the home screen — this is the first one, under
   "Single Payment", not "Batch Payment").
   - Opens a sheet titled "Pay" (`pay.headerTitle`), amount **123.45 ₴**.
2. `mobile_list_elements_on_screen`. In order, there are 3
   `pay.cardInfoView` fields:
   1. `TextField` — Card number
   2. `TextField` — Expiry (MM/YY)
   3. `SecureTextField` — CVV
3. Tap field 1, type `4242424242424242`.
4. **Re-run `mobile_list_elements_on_screen`** (keyboard shifts the layout —
   same gotcha as case 1).
5. Tap field 2, type `0632`.
6. Tap field 3, type `123`.
7. Tap **"Pay 123.45 ₴"** (`pay.cardPayButton`).
8. Wait ~2-3s. A "Test ACS Page" loads inside a WebView
   (`pay.threeDS.threeDSWebViewWrapper`) showing the amount and masked card
   number for confirmation. It exposes two tappable elements:
   - `CONFIRM` (green button)
   - `Cancel` (text link, below it)

## Branch A — tap CONFIRM (happy path)

Sheet closes. Native alert on home screen:
- Title: **"Payment Success"**
- Body: `Payment completed successfully. External ID: <externalId>, Payment ID: <paymentId>`
- Button: `OK`

## Branch B — tap Cancel (fake decline)

1. Sheet shows an in-place error screen (`pay.errorView`):
   - Message: `Transaction rejected., externalId: <externalId>, paymentId: <paymentId>`
   - Buttons: `Cancel`, `Try again`
2. Tap `Cancel` → sheet closes, native alert appears on home screen:
   - Title: **"Payment Failed"**
   - Body: `Payment failed: Transaction rejected.`
   - Button: `OK`

(`Try again` re-submits the same request and re-opens the 3DS challenge —
useful if you want to flip from Cancel to Confirm without re-entering card
details.)
