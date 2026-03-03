import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle(/QuickHire/);
  });

  test('hero heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Discover more than/i })).toBeVisible();
  });

  test('hero search input is accessible', async ({ page }) => {
    await expect(page.getByPlaceholder('Job title or keyword')).toBeVisible();
  });

  test('hero location input is accessible', async ({ page }) => {
    await expect(page.getByPlaceholder('City, country or remote')).toBeVisible();
  });

  test('Search my job button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /search my job/i })).toBeVisible();
  });

  test('navbar QuickHire logo is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /QuickHire/ }).first()).toBeVisible();
  });

  test('navbar Find Jobs link navigates to /jobs', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Jobs' }).first().click();
    await expect(page).toHaveURL(/\/jobs/);
  });

  test('popular search chips are visible', async ({ page }) => {
    await expect(page.getByText('Popular:')).toBeVisible();
    await expect(page.getByRole('link', { name: 'UI Designer' })).toBeVisible();
  });

  test('clicking popular chip navigates to jobs with search', async ({ page }) => {
    await page.getByRole('link', { name: 'UI Designer' }).click();
    await expect(page).toHaveURL(/search=UI\+Designer/);
  });

  test('hero search form navigates to /jobs on submit', async ({ page }) => {
    await page.getByPlaceholder('Job title or keyword').fill('react developer');
    await page.getByRole('button', { name: /search my job/i }).click();
    await expect(page).toHaveURL(/\/jobs/);
    await expect(page).toHaveURL(/search=react/);
  });

  test('footer is visible', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});
