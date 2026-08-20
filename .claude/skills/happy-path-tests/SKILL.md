---
name: happy-path-tests
description: Run the RozetkaPay SDK example app's happy-path flows (tokenize card, pay with card/token, single + batch payment, both fake-3DS outcomes) on iOS Simulator and/or Android Emulator via the mobile-mcp MCP server, and report pass/fail per case. Accepts a platform argument. Use when asked to test/verify the SDK, run simulator/emulator tests, smoke-test the example app, or check that a change didn't break the payment flows.
---

# Happy-path tests

Drives the `example` app through every documented happy path on the
requested platform(s) and reports results.

## 0. Parse the platform argument

- `platform=ios` → iOS Simulator only
- `platform=android` → Android Emulator only
- `platform=both` (or no argument given) → both, one after another
  (run iOS first, then Android — don't run them concurrently unless you've
  confirmed the host has resources for it; see the Android gotcha about ANRs
  under host load)

If the argument is ambiguous or missing and the user's intent isn't obvious
from context, ask rather than guessing which platform(s) to run.

## 1. Read the docs fresh — don't rely on memory

The source of truth for *how* to execute each flow is in this repo's `test/`
directory:

- `test/README.md` — shared test card, case list, cross-platform notes
- `test/ios/README.md` + `test/ios/cases/*.md` — iOS setup and steps
- `test/android/README.md` + `test/android/cases/*.md` — Android setup and steps

**Read the relevant files at the start of every run.** They get updated
independently of this skill, and both platform docs carry hard-won
environment gotchas (interactive-prompt traps, emulator flags, keyboard/
scroll quirks, WebView accessibility differences) that will waste an entire
retry loop if skipped.

## 2. Preconditions

- Confirm the `mcp__mobile__*` tools are loaded (try
  `mcp__mobile__mobile_list_available_devices`). If they error or aren't
  available, the `mobile-mcp` MCP server isn't registered in this session —
  tell the user to run `claude mcp add mobile -- npx -y @mobilenext/mobile-mcp@latest`
  (if not already added — check `claude mcp list` first) and start a fresh
  Claude Code session, since MCP tools only register at session start.
- For Android specifically, expect the environment setup to need more manual
  intervention than iOS (emulator boot flags, port forwarding, occasional
  ANR recovery) — follow `test/android/README.md` literally rather than
  improvising from iOS muscle memory. The two platforms are *not*
  symmetrical in automation mechanics even though the app UI and flows are.

## 3. Environment setup

Follow the relevant platform README's "Environment setup" section exactly —
device/emulator boot, Metro startup and port forwarding, and initial
build+install vs. relaunch (skip the rebuild if the app is already installed
and only Metro or the device restarted).

## 4. Which cases to run

By default, run all 5 cases per platform, each with **both** 3DS branches
(Confirm and Cancel) — 9 outcomes per platform (case 1 has only one outcome,
no 3DS). If the invocation names specific cases ("just token flows", "only
batch", "case 2"), run only those and say what's being skipped and why.

## 5. Executing each case

Open the case file, follow its steps literally using the `mcp__mobile__*`
tools (`mobile_click_on_screen_at_coordinates`,
`mobile_list_elements_on_screen`, `mobile_type_keys`, `mobile_take_screenshot`,
`mobile_swipe_on_screen`, etc.), and apply the gotchas from the platform
README (re-list elements after focusing a field rather than assuming the
keyboard shifted — or didn't — the layout; tap element centers computed as
`x + width/2, y + height/2`; on Android, take a screenshot and tap the fake
3DS page by proportional coordinates since its WebView content isn't in the
accessibility tree).

**If a tap's effect doesn't match what should have happened** (wrong field
got the typed text, screen didn't change), stop and re-list elements /
screenshot to see actual state before continuing — don't chain further
blind taps on top of a mistake, that compounds into scrambled form state
that's harder to diagnose than just re-checking once.

For case 1 (Tokenize card), if a fresh token is generated and you're about
to run cases 3/5 (Pay with Token), check whether
`example/src/config/Credentials.tsx` → `dev_test_card_token_1` needs
updating first — those cases fail immediately with `Receiver info error`
(no 3DS reached) if the configured token is stale. This constant is shared
across platforms — a token minted on one platform works on the other. If you
update it, force-stop and relaunch the app (don't rely on Metro fast refresh
picking up a config constant change reliably).

After each action that should produce a result (3DS Confirm/Cancel tap,
or a Pay-with-Token tap that may skip 3DS entirely), verify via
`mobile_list_elements_on_screen` (more reliable than eyeballing a screenshot
for exact alert copy) that the outcome matches what the case file says to
expect — alert title, message text, presence/absence of Payment ID vs
External ID only, etc.

## 6. Reporting

End with one results table per platform run, one row per case × branch, e.g.:

| Case | Branch | Result | Notes |
|---|---|---|---|
| 1. Tokenize card | — | ✅ pass | token captured |
| 2. Single — Pay with Card | Confirm | ✅ pass | |
| 2. Single — Pay with Card | Cancel | ✅ pass | |
| 3. Single — Pay with Token | Confirm | ❌ fail | got `Receiver info error`, no 3DS reached — stale token, see note |
| ... | | | |

Call out anything that deviated from the documented expected result as a
potential regression, not just a test-execution slip — if the discrepancy
looks like an SDK/app bug rather than a stale fixture (stale token, emulator
not booted, host resource contention) or documented platform behavior (e.g.
Android's frictionless-token-payment pattern), say so explicitly and suggest
where to look (the relevant native module or example screen).

**If you observe new environment gotchas** (a new interactive-prompt trap, a
new emulator instability, a UI/identifier change) that aren't already
written up in the platform README, add them there as part of finishing the
run — that's what keeps this skill reliable for the next session instead of
re-discovering the same traps from scratch.
