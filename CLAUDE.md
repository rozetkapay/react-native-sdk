# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@rozetkapay/rozetka-pay-sdk-react-native` — a React Native wrapper (legacy
native module, not Turbo Module) around two platform-native RozetkaPay SDKs:

- **iOS**: [rozetkapay/ios-sdk](https://github.com/rozetkapay/ios-sdk) pulled in via Swift Package Manager (see `RozetkaPaySdk.podspec`)
- **Android**: [rozetkapay/android-sdk](https://github.com/rozetkapay/android-sdk) a Gradle dependency

The package exposes tokenization and payment (single + batch) flows, plus
native Apple Pay / Google Pay buttons, to JS/TS consumers.

## Commands

Run from the repo root (yarn workspaces; `example` is a workspace):

```bash
yarn test                    # jest (root package only)
yarn typecheck                # tsc --noEmit
yarn lint                     # eslint "**/*.{js,ts,tsx}"
yarn clean                    # remove native build dirs + lib/
yarn prepare                  # react-native-builder-bob build (src/ -> lib/)

# single test file
yarn jest src/__tests__/index.test.tsx
```

Example app (from `example/`, or via `yarn example <script>` from root):

```bash
yarn example ios               # build + run on iOS Simulator
yarn example android           # build + run on Android emulator
yarn example start             # Metro only
yarn example build:ios         # release-mode iOS build (see package.json for flags)
yarn example build:android
```

iOS native deps use SPM through CocoaPods, which requires dynamic frameworks:

```bash
cd example/ios && USE_FRAMEWORKS=dynamic pod install
```

There is no top-level build step for the library itself during development —
`example` consumes `src/` directly via Metro/the workspace link; `yarn prepare`
(bob build) only matters for publishing to npm.

## Architecture

**Three-layer bridge, mirrored per platform:**

```
src/index.tsx (public API)
  -> src/models/**            TS types + Domain<->JS "Converter" functions
  -> NativeModules.RozetkaPaySdk (Platform.select ios/android method names differ, e.g. init vs initialize)
    -> android/src/main/java/com/rozetkapaysdk/  Kotlin module + converters/
    -> ios/                                      Swift module + *Converters.swift
```

Every domain concept (tokenization params/result, payment params/result,
batch payment, theme configurator, field requirements) has a matching
`*Converter(s)` on **both** the TS side (`src/models/**/*Converter.ts`) and
each native side (`android/.../converters/**`, `ios/*Converters.swift`). When
changing a model's shape, all three representations need to stay in sync —
grep for the type name across `src/`, `android/src/main/java/com/rozetkapaysdk/converters/`,
and `ios/*Converters.swift` before considering a model change complete.

**Platform-specific components** use RN's file-extension resolution
(`.ios.tsx` / `.android.tsx`), e.g.
`src/components/RozetkaPayApplePayButton.{ios,android}.tsx` — Apple Pay is a
real native button view on iOS and a no-op/stub on Android, and vice versa
for Google Pay.

**iOS native module split**: `RozetkaPaySdk.mm` (Objective-C++ bridge
boilerplate) + `RozetkaPaySdk.swift` (actual implementation) — RN legacy
native modules on iOS need both.

**`example/`** is the integration target and manual-test harness — it is a
full RN app (its own `package.json`, `ios/`, `android/`) that depends on the
SDK via the yarn workspace link, not from npm. `example/src/config/Credentials.tsx`
holds the dev/prod widget keys, auth tokens, and merchant IDs used to exercise
the SDK; `example/src/screens/main/MainScreen.tsx` wires up all the demo
buttons (Tokenize, Pay with Card/Token, Batch, Apple/Google Pay).

## Manual/agent emulator testing

`test/` contains step-by-step instructions (not automated test code) for
driving the `example` app on iOS Simulator and Android Emulator via the
`mobile-mcp` MCP tools, verifying the SDK's happy paths end-to-end including
both outcomes of the sandbox's fake 3DS challenge. See `test/README.md` (and
`test/ios/`, `test/android/` for platform-specific steps/gotchas). Run via
the `happy-path-tests` skill, e.g. `/happy-path-tests platform=ios` or
`platform=android` (or both).
