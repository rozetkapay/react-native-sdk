# iOS happy-path tests

Instructions for driving the `example` app on iOS Simulator via the
[mobile-mcp](https://github.com/mobile-next/mobile-mcp) MCP server. See
`../README.md` for the shared test card and case list — this file only has
iOS-specific setup and gotchas.

## Environment setup (once per session)

```bash
# 1. Boot simulator (skip if already booted)
xcrun simctl boot "iPhone 16 Pro"
open -a Simulator

# 2. Start Metro from the example app (skip if already running — Metro on
#    :8081 is shared across iOS and Android, no need to run two instances)
cd example && npx react-native start   # run in background, keep alive

# 3. Build + install once (only needed if the app isn't already installed,
#    or after a native code change)
npx react-native run-ios --simulator "iPhone 16 Pro"

# 4. If the app is already installed and Metro just (re)started, relaunch
#    instead of rebuilding — much faster:
#    mcp__mobile__mobile_launch_app(device, packageName: "rozetkapaysdk.example")
```

Device id: get it fresh each session via `mcp__mobile__mobile_list_available_devices`
(don't hardcode it — simulator UDIDs vary by machine). Package name is fixed:
`rozetkapaysdk.example`.

Metro must be running and reachable on `localhost:8081` *before* you launch the
app, otherwise it shows a red-box connection error instead of the UI.

## Cases

1. [Tokenize card](cases/01-tokenize-card.md)
2. [Single Payment — Pay with Card](cases/02-single-payment-card.md)
3. [Single Payment — Pay with Token](cases/03-single-payment-token.md)
4. [Batch Payment — Pay with Card](cases/04-batch-payment-card.md)
5. [Batch Payment — Pay with Token](cases/05-batch-payment-token.md)

## Agent gotchas learned while building this

- **The view scrolls when the keyboard appears.** Coordinates from
  `mobile_list_elements_on_screen` shift after you focus the first text field in
  a form (the keyboard pushes the scroll view up). Re-run
  `mobile_list_elements_on_screen` after focusing a field and before computing
  the next tap target — don't reuse coordinates captured before the keyboard
  was up, or you'll type into the wrong field.
- **Tap the center of an element, not its top-left corner.** Compute
  `x + width/2, y + height/2` from the reported `coordinates`. Tapping the edge
  of a native alert button (e.g. y at the very top of its bounding box) can miss.
- **Same accessibility identifier is reused for multiple fields** in both the
  Tokenization sheet (`tokenization.cardInfoView`) and the Pay sheet
  (`pay.cardInfoView`) — they're not unique per field. Disambiguate by order in
  the `mobile_list_elements_on_screen` array (top to bottom) and by `type`
  (`TextField` vs `SecureTextField` for CVV).
- **The fake 3DS "CONFIRM"/"Cancel" controls live inside a WebView**
  (`pay.threeDS.threeDSWebViewWrapper`) but are still exposed to
  `mobile_list_elements_on_screen` as tappable elements with labels `CONFIRM`
  and `Cancel` — no special webview handling needed, tap by coordinates as usual.
- **Cardholder name became required in the tokenization form as of iOS SDK
  0.3.15** (previously optional) — see [case 1](cases/01-tokenize-card.md).
  If a future run hits `Cardholder name can't be empty` unexpectedly, check
  whether this reverted.
- **Payment result surfaces in two layers**, not one:
  1. On failure, the sheet first shows an in-place error screen
     (`pay.errorView`) with the raw message + `Cancel`/`Try again` buttons.
     Tapping `Cancel` there closes the sheet.
  2. Only then does a native alert appear on the home screen (`Payment Failed`
     / `Batch Payment Failed`, with the same message). On success, the sheet
     closes immediately and only that final native alert appears (no
     intermediate screen).
- **`mobile_type_keys` can scramble or drop characters** when typing into a
  field immediately after tapping it (the keyboard is still animating in) —
  observed on both a `SecureTextField`-adjacent numeric field and a plain
  text field (e.g. `4242424242424242` landing as `4224 2424 2424 242`, or
  `Test Cardholder` landing as `Test Cardhoer`). Always re-list elements
  after typing and check the field's `value`/`text` against what you meant
  to type — don't assume the call succeeded just because it returned. If it
  scrambled, clear the field (tap the on-screen delete key once per
  character — one tap reliably removes exactly one character) and retype;
  a second attempt has been reliable so far. Numeric keypad digit-by-digit
  tapping (compute key centers from a screenshot) is a slower but fully
  reliable fallback if retyping keeps scrambling.
