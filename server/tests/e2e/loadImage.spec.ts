import { test, expect } from '@playwright/test';

// Test 1: Image loads when the page opens
test('dog image loads on page load', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForResponse('**/api/dogs/random');

  const dogImage = page.locator('img.dog-image');
  await expect(dogImage).toBeVisible();

  const src = await dogImage.getAttribute('src');
  expect(src).toBeDefined();
  expect(src?.startsWith('https://')).toBe(true);
});

// Test 2: Image loads after clicking the button
test('dog image loads when button is clicked', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForResponse('**/api/dogs/random');

  const fetchButton = page.locator('.fetch-button');
  await fetchButton.click();
  await page.waitForResponse('**/api/dogs/random');

  const dogImage = page.locator('img.dog-image');
  await expect(dogImage).toBeVisible();

  const src = await dogImage.getAttribute('src');
  expect(src).toBeDefined();
  expect(src?.startsWith('https://')).toBe(true);
});

// Test 3: Error shown if API fails
test('shows error when dog API call fails', async ({ page }) => {
  await page.route('**/api/dogs/random', route => route.abort());
  await page.goto('http://localhost:5173');

  const errorElement = page.locator('.error');
  await expect(errorElement).toBeVisible();
  await expect(errorElement).toHaveText(/error/i);
});    
