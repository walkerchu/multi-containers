const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  fullyParallel: false,
  
  projects: [
    /* === desktop browser === */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* === mobile devices === */
    {
      name: 'Mobile Safari (iPhone 17e)',
      use: { ...devices['iPhone 17e'] },
    },
    {
      name: 'Mobile Safari (iPad Pro 11)',
      use: { ...devices['iPad Pro 11'] },
    },
    {
      name: 'Mobile Chrome (Pixel 7)',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
