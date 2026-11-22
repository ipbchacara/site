// Gera boas-vindas.png (1920×1080) a partir de boas-vindas.html.
// Uso: node _comunicacao/projecao/exportar.js   (precisa do Playwright)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const pasta = __dirname;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file://' + path.join(pasta, 'boas-vindas.html') + '?exportar');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.locator('#palco').screenshot({ path: path.join(pasta, 'boas-vindas.png') });
  await browser.close();
})();
