# CalorAI Taste Profile

A cross-platform React Native application built with Expo for the CalorAI React Native Developer test task.

The app recreates the supplied dark, glass-morphism Figma direction and converts the extracted static Figma screens into a working mobile flow. Users can build a local taste profile by swiping through food cards, choosing what they like, dislike, feel unsure about, or strongly prefer. The final results screen summarizes the user's choices and generates simple taste traits from the selected food tags.

The implementation focuses on visual fidelity, smooth mobile interactions, Expo Go compatibility, and practical cross-platform handling for both iOS and Android.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Core Features](#core-features)
* [Tech Stack](#tech-stack)
* [Setup and Installation](#setup-and-installation)
* [Running With Expo Go](#running-with-expo-go)
* [Available Scripts](#available-scripts)
* [Project Architecture](#project-architecture)
* [Application Flow](#application-flow)
* [Data Handling](#data-handling)
* [Libraries Used and Why](#libraries-used-and-why)
* [Cross-Platform Handling](#cross-platform-handling)
* [Glass Morphism Implementation](#glass-morphism-implementation)
* [Animation and Interaction Details](#animation-and-interaction-details)
* [Assumptions and Trade-offs](#assumptions-and-trade-offs)
* [Verification Checklist](#verification-checklist)
* [Time Breakdown](#time-breakdown)
* [AI Tool Usage](#ai-tool-usage)
* [Future Improvements](#future-improvements)

---

## Project Overview

CalorAI Taste Profile is a mobile-first onboarding-style experience where a user teaches the app about their food preferences. The assignment required a 3-screen React Native app based on the provided Figma design:

1. Intro Screen
2. Swipe Screen
3. Results Screen

This implementation also includes an FAQ/supporting route as part of the app shell and navigation experience.

The main goal was not to build a backend-heavy product, but to demonstrate strong frontend execution: reusable native components, clean state management, smooth gestures, responsive layouts, glass-style visual treatment, and platform-aware implementation.

The app is intentionally local-only. All food data is loaded from the provided JSON file, all choices are stored in memory for the current session, and no authentication or backend calls are used.

---

## Core Features

### Intro Flow

The intro screen introduces the taste profile experience and gives the user a clear call-to-action to start swiping. It follows the dark theme and glass-style visual direction from the Figma reference.

### Swipe Deck

The swipe screen presents food cards one by one. The user can interact with the deck through both gestures and buttons.

Supported choices:

* Swipe right to like a food
* Swipe left to dislike a food
* Tap the like button
* Tap the dislike button
* Tap unsure
* Tap super-like
* Undo the last choice

The current progress is displayed through a live progress bar, and the user is automatically moved to the results screen after completing the deck.

### Results Screen

The results screen summarizes the user's choices from the current session.

It includes:

* Total liked foods
* Total disliked foods
* Unsure count
* Generated taste traits from selected food tags
* Foods the user liked
* Foods the user passed on
* A restart action to retake the taste profile

### Bottom Navigation

A shared bottom navigation component is used across the main app routes. It follows the frosted glass / liquid glass design direction and is implemented with platform-aware fallbacks so the UI remains polished on both iOS and Android.

### Responsive Native Layout

The UI uses safe-area handling, max-width layout constraints, flexible spacing, and platform-aware visual fallbacks so it works cleanly across device sizes and operating systems.

---

## Tech Stack

The app is built with:

* React Native
* Expo managed workflow
* Expo Router
* TypeScript
* React Native Reanimated
* React Native Gesture Handler
* Expo Go as the run target

Current project versions include Expo SDK 54, React 19, and React Native 0.81.

---

## Setup and Installation

### Prerequisites

Make sure you have the following installed:

* Node.js 20 or newer
* npm
* Expo Go on your physical iOS or Android device

Optional but useful:

* Xcode for iOS Simulator
* Android Studio for Android Emulator

### Clone the Repository

```bash
git clone https://github.com/AmanCrafts/Calor-AI-Assessment.git
cd Calor-AI-Assessment
```

### Install Dependencies

```bash
npm install
```

The project uses the Expo managed workflow, so no native iOS or Android project setup is required for Expo Go testing.

---

## Running With Expo Go

Start the Expo development server:

```bash
npx expo start
```

Then choose one of the following options:

### Physical Device

1. Install Expo Go from the App Store or Play Store.
2. Make sure your phone and development machine are on the same network.
3. Scan the QR code shown in the terminal or browser.
4. The app will open inside Expo Go.

### iOS Simulator

```bash
npm run ios
```

Or start Expo manually and press:

```bash
i
```

### Android Emulator

```bash
npm run android
```

Or start Expo manually and press:

```bash
a
```

### Web Preview

The assignment is focused on native iOS and Android behavior, but a web script is available through Expo:

```bash
npm run web
```

Native device or simulator testing should be treated as the source of truth for this task.

---

## Available Scripts

```bash
npm run start
```

Starts the Expo development server.

```bash
npm run ios
```

Starts the app in the iOS Simulator.

```bash
npm run android
```

Starts the app in the Android Emulator.

```bash
npm run web
```

Starts the Expo web preview.

Useful local verification commands:

```bash
npx tsc --noEmit
```

Runs TypeScript checking without generating output files.

```bash
npm run lint
```

Runs linting if the lint script is configured in the local environment.

---

## Project Architecture

The app is organized around Expo Router routes, reusable UI components, constants, shared state, and typed data models.

```bash
.
├── assets
├── data
│   └── food.json
├── src
│   ├── app
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── swipe.tsx
│   │   ├── results.tsx
│   │   ├── faq.tsx
│   │   └── search.tsx
│   ├── components
│   │   ├── app-header.tsx
│   │   ├── bottom-navigation.tsx
│   │   ├── food-card.tsx
│   │   ├── glass-panel.tsx
│   │   ├── icon-button.tsx
│   │   ├── profile-section.tsx
│   │   ├── screen-background.tsx
│   │   ├── swipe-action-button.tsx
│   │   └── swipe-progress.tsx
│   ├── constants
│   │   ├── animations.ts
│   │   ├── foods.ts
│   │   └── theme.ts
│   ├── context
│   │   └── taste-profile-context.tsx
│   └── types
│       └── food.ts
├── app.json
├── package.json
└── tsconfig.json
```

### `src/app`

Contains the file-based routes for Expo Router.

* `_layout.tsx` sets up the root providers, stack navigation, safe area handling, gesture handler root, status bar, and shared bottom navigation.
* `index.tsx` renders the intro screen.
* `swipe.tsx` renders the interactive swipe deck.
* `results.tsx` renders the generated taste profile summary.
* `faq.tsx` provides supporting assignment information.
* `search.tsx` exists as a supporting route in the app shell.

### `src/components`

Contains reusable UI and feature components.

Important components include:

* `food-card.tsx`: swipeable animated card with image, tags, decision badges, gesture handling, and imperative swipe support for button-triggered decisions.
* `glass-panel.tsx`: shared glass container with iOS Liquid Glass, iOS blur, and Android fallback handling.
* `bottom-navigation.tsx`: shared glass-style bottom navigation.
* `screen-background.tsx`: shared dark gradient screen wrapper.
* `swipe-progress.tsx`: progress indicator for the swipe deck.
* `swipe-action-button.tsx`: action buttons for dislike, unsure, super-like, and like.
* `profile-section.tsx`: reusable results section for grouped food choices.
* `app-header.tsx`: reusable header for screens that need consistent top layout.

### `src/constants`

Contains app-wide constants.

* `theme.ts` stores colors and layout values used across the app.
* `foods.ts` imports and exposes the provided JSON food data.
* `animations.ts` stores shared animation helpers or screen entry transitions.

### `src/context`

Contains the taste profile state provider.

The taste profile context keeps the app state simple and local. It stores the current choices, derives the current food from the deck index, records decisions, supports undo, and resets the session.

### `src/types`

Contains shared TypeScript models for food data and swipe decisions.

### `data`

Contains the provided `food.json` dataset. The app treats this file as the source of truth for the swipe deck.

---

## Application Flow

The app follows this flow:

```text
Intro Screen
    ↓
Swipe Screen
    ↓
Results Screen
```

### 1. Intro Screen

The user starts on the intro screen. This screen explains the purpose of the taste profile and gives a clear action to begin the swipe flow.

### 2. Swipe Screen

The swipe screen reads the current food from the taste profile context and displays it inside an animated card.

When the user makes a choice:

1. The swipe decision is recorded.
2. The current index advances.
3. The progress bar updates.
4. The next food becomes active.
5. If the deck is complete, the app navigates to the results screen.

### 3. Results Screen

The results screen reads the completed choices from context and groups them into liked, disliked, and unsure choices.

It also derives taste traits by counting tags from liked and super-liked foods, then showing the strongest tags as simple personality-style food traits.

The user can restart the flow, which clears local choices and returns to the swipe experience.

---

## Data Handling

The assignment provided a food JSON file. This implementation uses that JSON file instead of hardcoding food cards in the UI.

The data flow is:

```text
data/food.json
    ↓
src/constants/foods.ts
    ↓
taste-profile-context.tsx
    ↓
Swipe Screen and Results Screen
```

This keeps the UI reusable and allows the deck to change without rewriting screen components.

The original Figma-exported screens were useful as visual references, but the working app uses real structured data from the JSON file.

---

## Libraries Used and Why

### Expo

Used as the managed React Native workflow so the project can run quickly in Expo Go without custom native setup.

### Expo Router

Used for file-based navigation. It keeps the screen structure simple and maps naturally to the assignment screens.

### React Native Gesture Handler

Used for native pan gestures on the food cards. This makes swipe recognition feel more reliable and native than manually handling touch events.

### React Native Reanimated

Used for UI-thread animations, card movement, rotation, spring reset, decision badges, and swipe transitions. This helps keep interactions smooth and closer to 60fps.

### React Native Worklets

Used because Reanimated 4 depends on worklets for UI-thread execution.

### Expo Blur

Used as a blur fallback for glass-style panels on supported platforms, especially older iOS versions where the newer Liquid Glass API is not available.

### Expo Glass Effect

Used to render Apple’s Liquid Glass style on supported iOS versions. This gives iOS the closest native match to the frosted/glass visual direction.

### Expo Linear Gradient

Used for the dark layered gradient background so screens match the Figma mood and do not look flat.

### Expo Image

Used for efficient remote food image rendering and prefetching. This helps food cards feel smoother when moving through the deck.

### Expo Haptics

Used for subtle feedback when users make swipe decisions or use action buttons.

### React Native Safe Area Context

Used to respect notches, home indicators, status bars, and Android system UI areas.

### Expo Status Bar and System UI

Used to keep the app visually consistent with the dark theme and edge-to-edge screen treatment.

### TypeScript

Used for safer shared models, typed food data, typed swipe decisions, and better maintainability.

---

## Cross-Platform Handling

The Figma design was supplied for an iOS-sized viewport, but the implementation is designed to run on both iOS and Android.

The goal was to keep iOS as close as possible to the Figma while making Android feel intentionally designed rather than treated as an afterthought.

### iOS

On supported iOS versions, the app uses Apple-style Liquid Glass through `expo-glass-effect`. This is used for glass panels and navigation elements where the design benefits from native material behavior.

For older iOS versions, the app falls back to `expo-blur`, preserving the frosted glass look with blur, transparency, rounded corners, and borders.

### Android

Android does not support Apple’s Liquid Glass material because it is an iOS system API. Android blur behavior is also not identical to iOS blur.

To avoid broken or empty glass containers, Android uses a high-opacity translucent fallback with:

* dark semi-transparent surface color
* subtle border
* rounded corners
* depth treatment
* consistent spacing and layout

This keeps the glass-morphism direction visually close while avoiding unsupported native behavior.

### Layout and Safe Areas

The app uses safe-area handling so content does not collide with:

* iOS notch
* iOS home indicator
* Android status bar
* Android navigation area
* gesture navigation regions

Screens also use max-width constraints so the UI does not become overly stretched on wider devices.

---

## Glass Morphism Implementation

Glass morphism is handled through a shared `GlassPanel` component instead of being duplicated across screens.

The component is responsible for choosing the best visual implementation per platform:

```text
iOS with Liquid Glass support
    → expo-glass-effect

Older iOS / blur-supported environments
    → expo-blur

Android
    → translucent dark fallback with border and rounded corners
```

This approach keeps the design system consistent and makes platform-specific behavior easier to maintain.

The shared glass component is used for cards, navigation containers, and profile/result sections.

---

## Animation and Interaction Details

The swipe card interaction is built around Reanimated shared values and Gesture Handler pan gestures.

Important interaction details:

* Horizontal drag moves the active card.
* The card rotates slightly based on horizontal movement.
* Releasing below the threshold springs the card back to center.
* Releasing beyond the threshold commits the decision.
* Fast left/right velocity also commits the decision.
* Like and dislike badges fade in based on drag direction.
* Super-like and unsure actions use separate feedback animations.
* The next card is partially prepared underneath the active card.
* Food images are prefetched where possible to reduce visible loading during deck progression.

Button actions call into the same swipe behavior as gestures, so tapping a button still feels like the card is being moved through the deck rather than simply disappearing.

---

## State Management

The app intentionally avoids heavy state management libraries because the assignment scope is local and UI-focused.

The taste profile state is managed through React context.

The context stores:

* all recorded choices
* current deck index
* current food
* completion state
* record choice action
* undo action
* reset action

This keeps the app simple while avoiding excessive prop drilling between the swipe screen, results screen, and shared UI components.

---

## Assumptions and Trade-offs

### No Backend or Persistence

The assignment does not require authentication, backend APIs, or database persistence. Choices are stored locally in memory for the current session only.

If the app reloads, the current taste profile session resets.

### JSON Data Is the Source of Truth

The provided `data/food.json` file is treated as the source of truth. The extracted Figma screens had hardcoded placeholder values, but the final app renders the real food dataset.

### Visual Fidelity Over Feature Expansion

The focus was on matching the supplied Figma direction, implementing the core swipe flow, and keeping the UI polished on both platforms.

Advanced product features such as account creation, saved profiles, meal plan generation, and backend recommendations were intentionally kept out of scope.

### Android Glass Fallback

Android cannot reproduce Apple Liquid Glass natively. The Android implementation prioritizes a stable and polished fallback rather than forcing unsupported blur behavior.

### Results Logic Is Lightweight

The generated taste traits are based on selected food tags from liked and super-liked foods. This is intentionally simple, deterministic, and local. A real production app would likely use a richer preference model or backend recommendation system.

### Original Figma Exports Kept as Reference

The original extracted screens were treated as static visual references. They were not used directly as production screens because the exported files were long, hardcoded, and did not contain the required interaction logic.

---

## Verification Checklist

Before submission, the following checks are recommended:

```bash
npm install
npx expo start
```

Then verify:

* The app opens in Expo Go.
* Intro screen loads correctly.
* Start action opens the swipe flow.
* Food cards render from JSON data.
* Swipe right records a positive choice.
* Swipe left records a negative choice.
* Like button works.
* Dislike button works.
* Unsure button works.
* Super-like button works.
* Undo button reverses the last choice.
* Progress updates after each choice.
* Completing the deck opens the results screen.
* Results show liked, disliked, and unsure counts.
* Restart clears the session and starts again.
* Bottom navigation renders correctly.
* Glass panels render on iOS.
* Android fallback panels do not appear broken or transparent.
* Safe areas are respected on devices with notches or gesture navigation.
* The app does not require a backend or login.

Optional code checks:

```bash
npx tsc --noEmit
npm run lint
```

---

## Time Breakdown

The assignment suggested a 6 to 8 hour time budget. The approximate time distribution for this implementation was:

| Task                                                                         |  Time |
| ---------------------------------------------------------------------------- | ----: |
| Reviewing assignment requirements and extracted Figma files                  |  0.5h |
| Planning component structure and navigation flow                             |  0.5h |
| Creating shared theme, background, glass, and navigation components          |  1.5h |
| Integrating JSON food data and TypeScript models                             | 0.75h |
| Implementing taste profile context and local state actions                   |    1h |
| Building swipe gestures, card rotation, thresholds, action buttons, and undo |    2h |
| Building results screen, breakdown sections, and generated taste traits      |    1h |
| Cross-platform polish for iOS, Android, safe areas, and glass fallbacks      |    1h |
| README documentation and final verification                                  | 0.75h |

Total estimated time: approximately 8 hours.

---

## AI Tool Usage

AI tools were used as coding support during the assignment, as encouraged in the task brief.

Tools used:

* OpenAI Codex
* ChatGPT
* GitHub Copilot-style assistance

How AI helped:

* Interpreting the assignment requirements and turning them into a practical implementation checklist.
* Refactoring the extracted Figma-oriented code into smaller native components.
* Planning a clean project structure around screens, components, constants, context, and types.
* Implementing swipe interaction logic with Reanimated and Gesture Handler.
* Drafting platform-specific glass fallback logic.
* Reviewing README content against the submission requirements.
* Improving wording around assumptions, trade-offs, and technical decisions.

All generated suggestions were reviewed and adjusted manually. The final implementation decisions were made based on the assignment requirements, the provided Figma direction, Expo Go compatibility, and practical cross-platform React Native constraints.

---

## Future Improvements

Given more time, the app could be extended with:

* Persistent local storage for saved taste profiles
* More detailed taste scoring
* Better generated personality summaries
* More advanced meal recommendation logic
* Accessibility pass for labels, contrast, and screen readers
* Additional Android visual tuning on multiple device sizes
* EAS preview build for easier external testing
* Automated UI smoke tests
* More detailed loading states for remote images

---

## Submission Notes

This project is ready to be submitted with:

* GitHub repository link
* Walkthrough video link
* Optional Expo build or preview link

The walkthrough video should cover:

1. Running the app in Expo Go or simulator.
2. Intro screen and visual direction.
3. Swipe gestures and button controls.
4. Progress updates.
5. Undo behavior.
6. Results summary.
7. Glass morphism and Android/iOS fallback strategy.
8. Architecture and AI usage notes.
