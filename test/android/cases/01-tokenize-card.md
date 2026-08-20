# Case 1 — Tokenize card

## Goal

Verify a card can be saved/tokenized, and capture the resulting token for use
in the "Pay with Token" cases (3 and 5).

## Preconditions

- App running, on the home screen ("Rozetka Pay Demo").

## Steps

1. Tap **"Tokenize card"** (home screen, under "Tokenization:").
   - Opens a bottom sheet titled "Add your new card"
     (`tokenizationTitle`), inside `bottomSheet` / `tokenizationScreen`.
2. `mobile_list_elements_on_screen` to get current field coordinates. Unlike
   iOS, each field has its own unique identifier here:
   - `textFieldCardName` (optional) → child `EditText`
   - `textFieldCardNumber` → child `EditText`
   - `textFieldExpDate` → child `EditText`
   - `textFieldCvv` → child `EditText`
   - `textFieldCardholderName` → child `EditText` — **required on Android**
     (unlike iOS, where the equivalent field is optional)
3. Tap the `textFieldCardNumber` `EditText`, type `4242424242424242` (no
   spaces — auto-formats and shows the card brand, e.g. "VISA").
4. **Re-run `mobile_list_elements_on_screen`** before continuing — check
   whether the keyboard shifted field y-coordinates (it doesn't always).
5. Tap `textFieldExpDate`, type `0632` (renders as `06/32`).
6. Tap `textFieldCvv`, type `123`.
7. Tap `textFieldCardholderName`, type a name, e.g. `Test Cardholder`. If you
   skip this, tapping Save shows an inline error
   `Cardholder name can't be empty` (`textFieldErrorMessage`) and the sheet
   does not submit — go back and fill it in.
8. Tap **`buttonSave`** ("Save").

## Expected result

No 3DS challenge for tokenization — it resolves directly. A native Material
`AlertDialog` appears:

- Title (`android:id/alert_title`): **"Tokenization Success"**
- Message (`android:id/message`): `Tokenization Complete, token = : <token string>`
- Button (`android:id/button1`): `OK`

**Copy the token string from the dialog's message element** (via
`mobile_list_elements_on_screen`) — don't rely on the screenshot, the token
is long. This is the token to put in `example/src/config/Credentials.tsx` →
`dev_test_card_token_1` for cases 3 and 5. Note: this constant is shared
across platforms — a token minted here also works for the iOS cases, and
vice versa.

There is no failure/cancel branch for this case (no 3DS step is involved).
