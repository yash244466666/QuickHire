import { test, expect } from '@playwright/test';

test.describe('Job Detail Page', () => {
  test('shows 404 for non-existent job', async ({ page }) => {
    await page.goto('/jobs/999999');
    // Next.js shows 404 page
    await expect(page.getByText(/not found/i)).toBeVisible();
  });

  test('navigates from jobs list to job detail', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');

    const jobCards = page.locator('a[href^="/jobs/"]');
    const count = await jobCards.count();

    if (count > 0) {
      const href = await jobCards.first().getAttribute('href');
      await jobCards.first().click();
      await expect(page).toHaveURL(new RegExp(href!));
      // Job detail should have a heading
      await expect(page.getByRole('heading').first()).toBeVisible();
    } else {
      test.skip(true, 'No jobs in database');
    }
  });

  test('job detail shows breadcrumb navigation', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');

    const jobLink = page.locator('a[href^="/jobs/"]').first();
    const count = await jobLink.count();
    if (count === 0) return test.skip(true, 'No jobs available');

    await jobLink.click();
    await expect(page.getByRole('link', { name: /jobs/i })).toBeVisible();
  });

  test('apply button is visible on job detail', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');

    const jobLink = page.locator('a[href^="/jobs/"]').first();
    if (await jobLink.count() === 0) return test.skip(true, 'No jobs available');

    await jobLink.click();
    await expect(page.getByRole('button', { name: /apply/i })).toBeVisible();
  });

  test('apply modal opens on Apply button click', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');

    const jobLink = page.locator('a[href^="/jobs/"]').first();
    if (await jobLink.count() === 0) return test.skip(true, 'No jobs available');

    await jobLink.click();
    await page.getByRole('button', { name: /apply/i }).click();

    // Modal or form should appear
    await expect(page.getByRole('dialog').or(page.getByTestId('apply-form'))).toBeVisible()
      .catch(() => {
        // Some implementations show inline form, check for name/email inputs
        return expect(page.getByLabel(/name/i)).toBeVisible();
      });
  });
});
