import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin');
  });

  test('dashboard loads without error', async ({ page }) => {
    await expect(page).not.toHaveURL(/error/);
  });

  test('dashboard heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('stats cards are visible', async ({ page }) => {
    await expect(page.getByText(/total jobs/i)).toBeVisible();
    await expect(page.getByText(/applications/i)).toBeVisible();
  });

  test('admin sidebar navigation is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /manage jobs|jobs/i }).first()).toBeVisible();
  });

  test('Quick Actions section is present', async ({ page }) => {
    await expect(page.getByText(/quick actions/i)).toBeVisible();
  });

  test('Manage Jobs link navigates to admin/jobs', async ({ page }) => {
    await page.getByRole('link', { name: /manage jobs/i }).first().click();
    await expect(page).toHaveURL(/\/admin\/jobs/);
  });
});

test.describe('Admin Jobs Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/jobs');
  });

  test('admin jobs page loads', async ({ page }) => {
    await expect(page).not.toHaveURL(/error/);
  });

  test('post a job button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /post|add|create/i })).toBeVisible();
  });

  test('jobs table or list is present', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    // Either the table or a "no jobs" message
    const hasTable = await page.locator('table').count();
    const hasJobList = await page.locator('[class*="job"]').count();
    const hasEmpty = await page.getByText(/no jobs/i).isVisible().catch(() => false);
    expect(hasTable > 0 || hasJobList > 0 || hasEmpty).toBeTruthy();
  });
});

test.describe('Admin Applicants Page', () => {
  test('admin applicants page loads', async ({ page }) => {
    await page.goto('/admin/applicants');
    await expect(page).not.toHaveURL(/error/);
  });
});

test.describe('Admin Settings Page', () => {
  test('settings page loads with profile section', async ({ page }) => {
    await page.goto('/admin/settings');
    await expect(page.getByText(/profile/i)).toBeVisible();
  });

  test('settings page has notifications section', async ({ page }) => {
    await page.goto('/admin/settings');
    await expect(page.getByText(/notification/i)).toBeVisible();
  });
});
