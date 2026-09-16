# Android happy-path tests

Instructions for driving the `example` app on an Android Emulator via the
[mobile-mcp](https://github.com/mobile-next/mobile-mcp) MCP server. See
`../README.md` for the shared test card and case list — this file only has
Android-specific setup and gotchas.

## Environment setup (once per session)

```bash
# 1. List AVDs, boot one (skip boot if already running — check `adb devices`)
emulator -list-avds
"$ANDROID_HOME/emulator/emulator" -avd <avd-name> -no-snapshot -gpu swiftshader_indirect &

# 2. Wait for boot, then forward Metro's port into the emulator
adb wait-for-device
until [ "$(adb shell getprop sys.boot_completed 2>/dev/null)" = "1" ]; do sleep 2; done
adb reverse tcp:8081 tcp:8081

# 3. Start Metro from the example app if not already running
cd example && npx react-native start   # run in background, keep alive

# 4. Build + install once (only needed if the app isn't already installed,
#    or after a native code change) — prefer gradlew directly over
#    `react-native run-android` (see gotcha below)
cd example/android && ./gradlew installDebug -PreactNativeDevServerPort=8081

# 5. Launch (or relaunch after a Metro/adb restart)
adb shell am start -n rozetkapaysdk.example/.MainActivity
```

Use `"$ANDROID_HOME/emulator/emulator"` (not whatever `emulator` resolves to
on `PATH` — on some setups that's a stale `tools/emulator` shim that computes
its own binary path wrong and fails with `qemu-system-aarch64: No such file
or directory`).

Package name is fixed: `rozetkapaysdk.example` (same as iOS's bundle id).
Device id for `mcp__mobile__*` tools: get it fresh via
`mcp__mobile__mobile_list_available_devices` — it's the AVD name (e.g.
`Pixel_9a`), not a UDID.

## Cases

1. [Tokenize card](cases/01-tokenize-card.md)
2. [Single Payment — Pay with Card](cases/02-single-payment-card.md)
3. [Single Payment — Pay with Token](cases/03-single-payment-token.md)
4. [Batch Payment — Pay with Card](cases/04-batch-payment-card.md)
5. [Batch Payment — Pay with Token](cases/05-batch-payment-token.md)

## Agent gotchas learned while building this

- **`-gpu swiftshader_indirect` matters.** The default (host GPU passthrough)
  repeatedly produced a `System UI isn't responding` / `Process system isn't
  responding` ANR on this AVD after a few minutes of interaction, especially
  under host load (running the iOS Simulator, Gradle/Kotlin daemons, and an
  IDE at the same time). It did not self-recover even after minutes of
  waiting or tapping "Wait" repeatedly — the guest clock visibly froze. Cold
  restarting with `-no-snapshot -gpu swiftshader_indirect` (and freeing host
  resources, e.g. quitting the iOS Simulator if it's not needed) resolved it
  every time software rendering was used instead.
- **`-no-snapshot-save` is not enough to force a cold boot** — the emulator
  still *loads* an existing quick-boot snapshot on start (which can include a
  frozen/ANR'd state). Use `-no-snapshot` to skip both save and load.
- **`react-native run-android` prompts interactively** ("Use port 8082
  instead?") when it detects something already on :8081 (e.g. Metro shared
  with a concurrent iOS session), and that prompt has no non-interactive
  answer in this environment — it just fails. Skip the CLI wrapper and drive
  Gradle directly: `./gradlew installDebug -PreactNativeDevServerPort=8081`
  from `example/android/`, then `adb shell am start -n
  rozetkapaysdk.example/.MainActivity` yourself.
- **The view scrolls when the keyboard appears — inconsistently.** Same
  gotcha as iOS (re-run `mobile_list_elements_on_screen` after focusing a
  field, before computing the next tap), but on Android it doesn't reliably
  shift every time — sometimes the Card number → Expiry → CVV fields keep the
  same y-coordinates after the keyboard opens, sometimes they don't (observed
  both in this same app). Don't assume either way — always re-list.
- **A floating Gboard clipboard/tools flyout can appear** over the left edge
  of the keyboard and intercept taps aimed at a field near it. If typed text
  lands in the wrong field, re-list elements and check what actually has
  `"focused": true` before continuing, rather than assuming the tap worked.
- **WebView content (the fake 3DS "CONFIRM"/"Cancel" page) is *not* exposed**
  to `mobile_list_elements_on_screen` on Android the way it is on iOS — the
  accessibility tree just shows the outer `WebView` container. Take a
  screenshot and tap CONFIRM/Cancel by proportional screen coordinates
  instead (roughly 57% and 64% down the screen respectively, in this app).
- **Error/failure UI has one fewer layer than iOS.** There's no in-sheet
  "Try again" screen — cancelling the 3DS challenge (or any payment failure)
  goes straight to a native Material `AlertDialog` (`Payment Failed` /
  `Batch Payment Failed`) plus a `Snackbar` toast at the bottom with the same
  message. On success, only the alert appears (`Payment Success` /
  `Batch Payment Success`), same as iOS.
- **Tokenizing a card requires "Cardholder name"** on Android — leaving it
  empty shows an inline `Cardholder name can't be empty` validation error and
  blocks Save. On iOS the same field is optional. Always fill it (e.g.
  `Test Cardholder`).
- **"Pay with Token" completed instantly without showing the 3DS challenge**
  in every run observed here (both Single and Batch). This might be
  frictionless/risk-based auth on the sandbox's side for a token that's
  already been used successfully before, rather than a hard Android-only
  rule — don't assume it always skips 3DS. If it does skip, that's expected;
  just verify the final `Payment Success`/`Batch Payment Success` alert.
- **The ANR gotcha above can still hit even with the recommended boot
  flags**, especially when the iOS Simulator + Xcode build + Gradle/Kotlin
  daemons are all running at the same time on the host (observed load avg
  in the 15-30 range, ~80% CPU busy). Tapping "Wait" on the ANR dialog does
  **not** recover it — it just re-freezes. Recovery that worked: quit the
  iOS Simulator (`osascript -e 'tell application "Simulator" to quit'`) to
  free host CPU, tap "Close app" on the ANR dialog, then
  `adb shell am force-stop rozetkapaysdk.example` followed by
  `adb shell am start -n rozetkapaysdk.example/.MainActivity` — a fresh
  process came back fully responsive. Don't bother retrying "Wait" more
  than once; go straight to force-stop + relaunch if the app doesn't
  recover on the first try.
- **A tap on a text field can occasionally open a "Try out your stylus"
  handwriting-input panel** (with a floating toolbar of
  mic/backspace/tab/emoji/language icons down the left edge, and a "Hold
  and drag to move toolbar" tooltip) instead of — or in addition to — the
  normal keyboard. It intercepts typing entirely (text goes nowhere). Tap
  the panel's own "Cancel" button to dismiss it, dismiss the tooltip via
  its "Got it" if present, then tap the target field again on the *right*
  side (away from the left-edge floating toolbar, which otherwise
  overlaps/intercepts taps on fields near it) before retyping.
- **A tap sometimes doesn't register at all the first time** (no focus
  change, no keyboard, field stays whatever it was) — this is distinct from
  the keyboard-shift gotcha above. If a field you just tapped isn't
  `focused: true` on the next `mobile_list_elements_on_screen`, just tap it
  again rather than assuming something is broken.
- **A React Native dev-mode LogBox ("Console Error") red overlay** can pop
  up full-screen after a failed payment (the example app calls
  `console.error` on failure) and blocks all taps underneath it. Tap its
  "Dismiss" button (bottom of the overlay) before continuing — "Minimize"
  also works but leaves a floating badge that can itself intercept later
  taps, so prefer Dismiss.
- **The failure Snackbar can persist across screens/navigations** longer
  than expected and overlap a button you need next (e.g. "Pay with Token"
  under Batch Payment sitting right where the Snackbar's dismiss `×` was).
  Take a screenshot before tapping a button near the bottom of the screen
  if a Snackbar was recently shown, and tap the element by its listed
  center — don't tap blind based on a remembered/previous layout, since a
  misplaced tap here can accidentally open the wrong sheet (e.g. Tokenize)
  instead of dismissing the toast.
