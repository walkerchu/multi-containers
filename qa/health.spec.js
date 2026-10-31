// DevOps with Docker, Fall 2026
// offer by The University of Helsinki
// chapter 3/containers-in-development
// url: https://courses.mooc.fi/org/uh-cs/courses/devops-with-docker-fall-2026/chapter-3/containers-in-development
// Exercise 2.11. Your dev env
// created at Oct 25, 2026 21:59 HKT

const { test, expect } = require('@playwright/test');

// ============================================================================
// 1. Web Application UI Testing Group
// ============================================================================

test.describe('Web Application UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://web-app:3000');
  });

  test('page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle(/Test Flow | Software Quality/);
  });

  test('nav head menu labels are correct', async ({ page }) => {
    await expect(page.locator('header > strong')).toHaveText('TestFlow');
    const nav = page.locator('header > strong + nav')
    await expect(nav.getByRole('link', { name: 'Process' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Tools' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
  })

  test('hero section labels are correct', async ({ page }) => {
    await expect(page.locator(".hero > h1"))
      .toHaveText("Flawless Code, Every Time.")

    await expect(page.locator(".hero > h1 + p"))
      .toHaveText("Master the art of software testing with our automated quality assurance workflows and manual verification frameworks.")
  })

  test('Get Start button is clickable', async ({ page }) => {
    await page.locator('a#action-btn').click()
    await expect(page.locator('p#message'))
      .toHaveText('Pick a small function, write one test for it. Starting small is the fastest way to build confidence.')
  })

  test('feature section labels are correct', async ({ page }) => {
    const cards = page.locator('.features > .card > h3')
    expect(await cards.count()).toBe(3)

    await expect(cards).toHaveText([
      "Unit Testing", "Integration", "End-to-End"
    ])
  })

})

// ============================================================================
// 2. Backend API Infrastructure Testing Group
// ============================================================================
test.describe('Backend API Infrastructure Tests', () => {

  // This test bypasses the browser page loading completely for maximum efficiency
  test('health check API should return diagnostic runtime metrics', async ({ request }) => {
    console.log(`Running API Test: ${test.info().title}`);

    // Directly invoke the backend microservice health endpoint via internal DNS
    const response = await request.get('http://web-app:3000/health');

    // Assert that the HTTP response status code is 200 OK
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Validate the production-ready monitoring contract structures
    expect(body.status).toBe('UP');
    expect(body).toHaveProperty('uptime');
    expect(body).toHaveProperty('system');
    expect(body.services.database).toBe('CONNECTED');
  })
})