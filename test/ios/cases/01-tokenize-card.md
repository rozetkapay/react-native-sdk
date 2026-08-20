# Case 1 — Tokenize card

## Goal

Verify a card can be saved/tokenized, and capture the resulting token for use
in the "Pay with Token" cases (3 and 5).

## Preconditions

- App running, on the home screen ("Rozetka Pay Demo").

## Steps

1. Tap **"Tokenize card"** (home screen, under "Tokenization:").
   - Opens a sheet titled "Add your new card" (`tokenization.headerTitle`).
2. `mobile_list_elements_on_screen` to get current field coordinates. In
   top-to-bottom order the sheet has 5 `tokenization.cardInfoView` elements:
   1. `TextField` — Card name (optional) — leave empty
   2. `TextField` — Card number
   3. `TextField` — Expiry (MM/YY)
   4. `SecureTextField` — CVV
   5. `TextField` — Cardholder name
3. Tap field 2 (card number), type `4242424242424242` (no spaces — the field
   auto-formats and shows the card brand, e.g. "VISA", once recognized).
4. **Re-run `mobile_list_elements_on_screen`** — the keyboard's appearance
   shifts every field below it. Use the fresh coordinates for the rest of
   this form.
5. Tap field 3 (expiry), type `0632` (renders as `06/32`).
6. Tap field 4 (CVV), type `123`.
7. (Optional) Tap field 5 (cardholder name), type any name, e.g.
   `Test Cardholder`. Not required for success.
8. Tap **"Save card"** (`tokenization.mainButton`).

## Expected result

No 3DS challenge for tokenization — it resolves directly. A native alert
appears:

- Title: **"Tokenization Success"**
- Body: `Tokenization Complete, token = : <token string>`
- Button: `OK`

**Copy the token string from the alert body** (via
`mobile_list_elements_on_screen`, read the `StaticText` value — don't rely on
the screenshot, the token is long and may be visually truncated). This is the
token to put in `example/src/config/Credentials.tsx` →
`dev_test_card_token_1` for cases 3 and 5.

There is no failure/cancel branch for this case (no 3DS step is involved).

