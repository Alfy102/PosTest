import { defineConfig, devices } from 'playwright/test';

const TIMEOUT = 30_000
const HEADLESS = true
const VIEWPORT = { width: 1920, height: 1080 }
const VIDEO_SIZE = { width: 1280, height: 720 }

export default defineConfig({
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
      name: 'Pos_E2E_Chromium',
      repeatEach: 0,
      timeout: TIMEOUT,
      use: {
        ...devices['Chromium'],
        headless: HEADLESS,
        channel: 'chromium',
        viewport: VIEWPORT,
        video: {
          mode: 'retain-on-failure',
          size: VIDEO_SIZE
        },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        trace: 'on'
      },
    },
    {
      name: 'Pos_E2E_Firefox',
      repeatEach: 0,
      timeout: TIMEOUT,
      use: {
        ...devices['Firefox'],
        headless: HEADLESS,
        viewport: VIEWPORT,
        video: {
          mode: 'retain-on-failure',
          size: VIDEO_SIZE
        },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        trace: 'on'
      },
    },
    {
      name: 'Pos_E2E_Edge',
      repeatEach: 0,
      timeout: TIMEOUT,
      use: {
        ...devices['Edge'],
        headless: HEADLESS,
        viewport: VIEWPORT,
        video: {
          mode: 'retain-on-failure',
          size: VIDEO_SIZE
        },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        trace: 'on'
      },
    }
  ]
});