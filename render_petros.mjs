import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const htmlPath = '/Users/james/CompetitorIQ/reports/petros-plan/petros-plan-build-playbook-2026-05-19.html';
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
  // wait extra for fonts
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.pdf({
    path: '/Users/james/CompetitorIQ/reports/petros-plan/petros-plan-build-playbook-2026-05-19.pdf',
    width: '794px',
    height: '1123px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log('PDF rendered.');
})();
