import { test, expect } from '@playwright/test';

test.describe('Jobs Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs');
  });

  test('page loads without errors', async ({ page }) => {
    await expect(page).not.toHaveURL(/error/);
  });

  test('search input is visible', async ({ page }) => {
    await expect(page.getByPlaceholder(/job title/i)).toBeVisible();
  });

  test('location input is visible', async ({ page }) => {
    await expect(page.getByPlaceholder(/city|location/i)).toBeVisible();
  });

  test('filter sidebar has Type of Employment section', async ({ page }) => {
    await expect(page.getByText(/type of employment/i)).toBeVisible();
  });

  test('filter sidebar has job type checkboxes', async ({ page }) => {
    // One of the known types
    await expect(page.getByLabel(/full-time/i)).toBeVisible();
  });

  test('jobs load on page', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForLoadState('networkidle');
    // Either show jobs or "no results" message
    const hasJobs = await page.locator('[class*="job-card"]').count();
    const hasEmpty = await page.getByText(/no jobs found/i).isVisible().catch(() => false);
    expect(hasJobs > 0 || hasEmpty).toBeTruthy();
  });

  test('grid/list view toggle buttons are present', async ({ page }) => {
    const gridBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
    await expect(gridBtn).toBeVisible();
  });

  test('searching updates URL with search param', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/job title/i);
    await searchInput.fill('engineer');
    await page.waitForTimeout(500); // debounce
    await expect(page).toHaveURL(/search=engineer/);
  });

  test('filtering by type updates URL', async ({ page }) => {
    await page.getByLabel(/full-time/i).click();
    await expect(page).toHaveURL(/type=Full-Time/);
  });
});
