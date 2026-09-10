# Gym Tracker — E2E Test Suite

[![Playwright Tests](https://github.com/yanaHaidukova/gym-tracker-e2e/actions/workflows/playwright.yml/badge.svg)](https://github.com/yanaHaidukova/gym-tracker-e2e/actions/workflows/playwright.yml)

End-to-end tests for [Gym Tracker](https://gym-tracker-five-chi.vercel.app) — a workout logging app built with Next.js and Supabase. Tests are written in Playwright with TypeScript using the Page Object Model pattern.

## Stack

- [Playwright](https://playwright.dev) — test runner and browser automation
- TypeScript
- Page Object Model (POM) for maintainable selectors
- Custom fixtures for reusable page setup
- Factory helpers for test data generation

## Test coverage

| Area | Tests |
|---|---|
| Login | Valid login, invalid credentials, forgot password navigation |
| Sign-up | Successful registration, validation errors, duplicate email, check-email page |

## Project structure

```
tests/
├── fixtures.ts          # Extended test object with page fixtures
├── helpers/
│   └── factories.ts     # Test data factory (createUser)
├── pages/
│   ├── LoginPage.ts
│   ├── SignUpPage.ts
│   └── ForgotPasswordPage.ts
├── login.spec.ts
└── sign-up.spec.ts
```

## Running locally

```bash
npm install
npx playwright install
```

Copy the example env file and fill in the values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `BASE_URL` | App URL to test against |
| `VERCEL_BYPASS_SECRET` | Vercel deployment protection bypass (optional) |

Run all tests:

```bash
npx playwright test
```

Run a specific project:

```bash
npx playwright test --project=chromium
```

Run smoke tests only:

```bash
npx playwright test --grep @smoke
```

Open the HTML report:

```bash
npx playwright show-report
```

## CI

Tests run via GitHub Actions on `workflow_dispatch`. Trigger a run manually from the [Actions tab](https://github.com/yanaHaidukova/gym-tracker-e2e/actions/workflows/playwright.yml) — the default URL points to the live app. The HTML report is uploaded as a build artifact after each run.
