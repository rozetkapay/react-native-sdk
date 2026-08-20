# Manual/agent happy-path tests

Instructions for driving the `example` app on a simulator/emulator via the
[mobile-mcp](https://github.com/mobile-next/mobile-mcp) MCP server and
verifying the SDK's happy paths — tokenize a card, pay with card/token for
single and batch payments, in both outcomes of the sandbox's fake 3DS step.
Written to be followed by an agent (Claude Code) turn by turn: every step
names the exact element identifier/label and the coordinate pattern to use.

Covers **iOS and Android**. The flows are the same on both platforms, but
element identifiers, coordinates, and environment setup differ enough that
each platform gets its own folder:

- [`ios/`](ios/README.md) — iOS Simulator
- [`android/`](android/README.md) — Android Emulator

Run via the `happy-path-tests` skill (`.claude/skills/happy-path-tests/`),
passing `platform=ios` or `platform=android` (or both). That skill is the
executable entry point; these docs are what it reads.

## Test card

All flows, both platforms, use the same fake test card (works in the
dev/sandbox environment only):

| Field | Value |
|---|---|
| Card number | `4242424242424242` |
| Expiry | any future date in year **2032**, e.g. `06/32` |
| CVV | any 3 digits, e.g. `123` |

## Cases (same 5 on both platforms)

1. Tokenize card
2. Single Payment — Pay with Card
3. Single Payment — Pay with Token
4. Batch Payment — Pay with Card
5. Batch Payment — Pay with Token

Run in this order — cases 3 and 5 (Pay with Token) rely on a valid token
being configured in `example/src/config/Credentials.tsx` →
`dev_test_card_token_1`, and case 1 is how you obtain a fresh one. This
constant is shared across platforms (same JS file, same backend token) — a
token you mint on iOS works for the Android "Pay with Token" cases too, and
vice versa. No need to re-tokenize per platform.

## Cross-platform findings so far

- Result semantics are identical on both platforms: single payment success
  includes both an External ID and a Payment ID; batch success/failure
  includes only a batch External ID. Confirming the fake 3DS step succeeds;
  cancelling it produces a `Transaction rejected.` error.
- See each platform's README for where the UI/automation mechanics diverge
  (dialog types, identifiers, WebView handling, etc).
