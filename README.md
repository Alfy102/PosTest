## 📋 Prerequisites

- Node.js 22 or higher
- Git

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Alfy102/PosTest.git
   cd test PosTest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🏃 Running Test

### Run test on all browser
```bash
npx playwright test
```

### Run test by test file
```bash
npx playwright test tests/Test_Case_1.spec.ts
```

### Run test by name
```bash
npx playwright test -g "Test Case 1"
```

### Run test by browser
```bash
npx playwright test --project Pos_E2E_Firefox
or
npx playwright test --project Pos_E2E_Edge
or
npx playwright test --project Pos_E2E_Chromium65
```

### Show test report
```bash
npx playwright show-report
```

## 📁 Project Structure

```
Postman Collection/
└── Posman Collection.json # Postman Collection
src/
├── pageObjects/           # Page Object classes
│   └── rateCalculator.page.ts
├── resources/            # Test data and locators
│   └── posman.resources.ts
├── tests/               # Test files
│   └── Test_Case_1.spec.ts
├── playwright.config.ts  # Playwright configuration
└── tsconfig.json        # TypeScript configuration
```

## 🔧 Configuration

Edit `playwright.config.ts` to configure test settings such as:
- Base URL
- Timeouts
- Viewport sizes
- Screenshot and video capture

## 📊 Test Reports

HTML Report:
```bash
npx playwright show-report
```
