import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  workers: 1,
  reportSlowTests: null,
  reporter: [
    ['list'],
    ['html', {
      open: 'never',
      outputFile: 'results.html',
      outputFolder: 'reports/',
    }]
  ],
  use: {
    baseURL: 'https://pos.com.my/',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'Posman_E2E',
      repeatEach: 0,
      timeout: 30_000,
      use: {
        ...devices['Chromium'],
        headless: true,
        channel: 'chromium',
        viewport: { width: 1920, height: 1080 },
        video: {
          mode: 'retain-on-failure',
          size: { width: 1280, height: 720 }
        },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        trace: 'on'
      },
    },
  ]
});