import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base = (process.env.TEST_URL || 'http://127.0.0.1:4321/').replace(/\/?$/, '/');
const browser = await chromium.launch({ channel: 'chrome' });
await mkdir('.local', { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of ['', 'de/', 'fr/', 'journal/', 'de/journal/', 'fr/journal/', 'journal/new-in-strasbourg/', 'journal/the-cathedral/', 'credits/']) {
    expect((await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' })).status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    expect(await page.locator('img:visible:not(.leaflet-tile)').evaluateAll(images => images.filter(img => !img.complete || !img.naturalWidth).map(img => img.src))).toEqual([]);
  }
  for (const route of ['pictures/', 'places/', 'journal/along-the-water/']) {
    expect((await page.goto(new URL(route, base).href)).status()).toBe(404);
  }
  await page.goto(base, { waitUntil: 'networkidle' });
  await expect(page.locator('.entry-pin')).toHaveCount(2);
  await expect(page.locator('.map-heading-panel, .map-actions, .map-filters, .map-entry-list')).toHaveCount(0);
  await expect(page.locator('.site-header nav').first().getByRole('link')).toHaveCount(2);
  const colours = await page.locator('.entry-pin').evaluateAll(pins => pins.map(pin => getComputedStyle(pin).borderTopColor));
  expect(new Set(colours).size).toBe(2);
  await page.screenshot({ path: '.local/home-desktop.png' });
  const pin = page.locator('.entry-pin.diary');
  await pin.hover();
  await expect(page.locator('.map-story-preview')).toBeVisible();
  await pin.click();
  await expect(page).toHaveURL(new URL('journal/new-in-strasbourg/', base).href);
  await page.getByRole('link', { name: 'Deutsch', exact: true }).click();
  await expect(page).toHaveURL(new URL('journal/de-new-in-strasbourg/', base).href);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mobile.goto(base, { waitUntil: 'networkidle' });
  await mobile.screenshot({ path: '.local/home-mobile.png' });
  await mobile.locator('.entry-pin.spot').tap();
  await expect(mobile.locator('.map-story-preview')).toBeVisible();
  await mobile.locator('.map-story-preview').tap();
  await expect(mobile).toHaveURL(new URL('journal/the-cathedral/', base).href);
  expect(await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
  expect(errors).toEqual([]);
  console.log('PASS: routes, removed pages, two entries, distinct colours, hover/click, language switching, mobile tap, images, and no runtime errors.');
} finally { await browser.close(); }
