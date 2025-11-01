// const { test, chromium, expect } = require('@playwright/test');

// test.describe.serial('Swag Labs', () => {

//   let browser, context, page;
//   const BASE_URL = 'https://www.saucedemo.com/';

//   test.beforeAll(async () => {
//     browser = await chromium.launch({headless: false,args: ['--start-maximized'],slowMo: 1000});
//     context = await browser.newContext({viewport: null,deviceScaleFactor: undefined});
//     page = await context.newPage();
//   });

//   test("Login with valid username and password", async () => {
//      await page.goto(BASE_URL, { timeout: 120000 });
//      await page.locator("xpath=//input[@id='user-name']").fill("standard_user");
//      await page.locator("xpath=//input[@id='password']").fill("secret_sauce");
//      await page.locator("xpath=//input[@id='login-button']").click();
//   });

//  test("Menu Navigation", async () => {
//       await page.getByRole('button', { name: 'Open Menu' }).click();
//       await page.locator('[data-test="about-sidebar-link"]').click();
//       await expect(page).toHaveURL('https://saucelabs.com/');
//   });

//   test("Footer Products Links Verification", async () => {  
//     await page.evaluate(() => {
//       window.scrollBy(0, 6000);
//     }); 

//        // Click 'More updates'
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'More updates' }).click(),
//     ]);

//     // ✅ Switch back to the first/original tab
//     const pages = page.context().pages(); // Get all open tabs
//     const firstPage = pages[0]; // The original page is always index 0
//     await firstPage.bringToFront(); // Focus back to main tab

//     // Open 'Products' dropdown (assuming it opens a menu, not navigation)
//     await page.locator('div').filter({ hasText: /^Products$/ }).nth(2).click();

//     // Click 'Platform for Test'
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Platform for Test' }).click(),
//     ]);
//     await page.goBack();

//     // Click 'Sauce Web Testing'
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Sauce Web Testing' }).click(),
//     ]);
//     await page.goBack();

//     // Click 'Sauce Mobile App Testing'
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Sauce Mobile App Testing' }).click(),
//     ]);
//     await page.goBack();

//     // Click 'Mobile App Distribution'
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Mobile App Distribution', exact: true }).click(),
//     ]);
//     await page.goBack();

//     // Click 'Sauce Error Reporting'
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Sauce Error Reporting' }).click(),
//     ]);
//     await page.goBack();

//     // Click 'Sauce Visual'
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Sauce Visual' }).click(),
//     ]);
//     await page.goBack();

//   });

//   test("Footer Global tools links", async () => {
//     await page.evaluate(() => {
//       window.scrollBy(0, 3000);
//     }); 
//     // await expect(page.getByText('Global tools').nth(1)).toBeVisible();
//      // Click each link and navigate back
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Sauce AI' }).click(),
//     ]);

//     // ✅ Switch back to the first/original tab
//     const pages = page.context().pages(); // Get all open tabs
//     const firstPage = pages[0]; // The original page is always index 0
//     await firstPage.bringToFront(); // Focus back to main tab

//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Sauce Insights' }).click(),
//     ]);
//     await page.goBack();

//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Sauce Performance' }).click(),
//     ]);
//     await page.goBack();
//   });

//   test("Footer Set up and integrate links", async () => {  
//     await page.evaluate(() => {
//       window.scrollBy(0, 3000);
//     }); 

//     // ✅ Check that the section is visible
//     await expect(page.getByText('Set up and integrate')).toBeVisible();
//     await page.waitForTimeout(2000);

//     // ✅ Click each link, wait for load, then go back
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Integrations & plugins' }).click(),
//     ]);
//     await page.waitForTimeout(2000);
//     await page.goBack();

//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Supported browsers and devices' }).click(),
//     ]);
//     await page.waitForTimeout(2000);
//     await page.goBack();

//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Platform configurator' }).click(),
//     ]);
//     await page.goBack();

//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Premium Consulting Services' }).click(),
//     ]);
//     await page.waitForTimeout(2000);
//     await page.goBack();

//   });

//   test("Footer Resources links", async () => {  
//     await page.evaluate(() => {
//       window.scrollBy(0, 3000);
//     }); 

//     // 1️⃣ Resources by topic
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Resources by topic' }).click(),
//     ]);
//     await page.waitForTimeout(2000);
//     await page.goBack();

//     // 2️⃣ Blog
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Blog', exact: true }).click(),
//     ]);
//     await page.waitForTimeout(2000);
//     await page.goBack();

//     // 3️⃣ FAQs
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'FAQs' }).click(),
//     ]);
//     // await page.goBack();
//     await page.waitForTimeout(2000);

//     // 4️⃣ Documentation
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Documentation' }).click(),
//     ]);
    
//     // ✅ Switch back to the first/original tab
//     const pages = page.context().pages(); // Get all open tabs
//     const firstPage = pages[0]; // The original page is always index 0
//     await firstPage.bringToFront(); // Focus back to main tab

//     // 5️⃣ Support
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Support', exact: true }).click(),
//     ]);
//     // ✅ Switch back to the first/original tab
//     await firstPage.bringToFront(); // Focus back to main tab

//     // 6️⃣ Videos
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Videos' }).click(),
//     ]);
//     await page.goBack();

//     // 7️⃣ Webinars
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Webinars' }).click(),
//     ]);
//     await page.goBack();
//   });

//   test("Company Links Verification", async () => {  
//     await page.evaluate(() => {
//       window.scrollBy(0, 3000);
//     }); 

//     // About us
//     await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'About us' }).click(),
//     ]);
//     await page.goBack();

//     // Security
//       await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Security' }).click(),
//     ]);
//     await page.goBack();

//     // Partners
//       await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Partners' }).click(),
//     ]);
//     await page.goBack();

//     // Careers
//       await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Careers' }).click(),
//     ]);
//     await page.goBack();

//     // News
//       await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'News' }).click(),
//     ]);
//     await page.waitForTimeout(2000);
//     await page.goBack();

//     // Contact us
//       await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Contact us' }).click(),
//     ]);
//     await page.goBack();

//     // Systems status
//       await Promise.all([
//       page.waitForLoadState('load'),
//       page.getByRole('link', { name: 'Systems status' }).click(),
//     ]);
    
//     // ✅ Switch back to the first/original tab
//     const pages = page.context().pages(); // Get all open tabs
//     const firstPage = pages[0]; // The original page is always index 0
//     await firstPage.bringToFront(); // Focus back to main tab
// });

//   test.afterAll(async () => {
//      await page.pause();
//      //await browser.close();
//   });
// });

//-----------------------------------------------------------------------------------------------------------------------


const { test, chromium, expect } = require('@playwright/test');

test.describe.serial('Swag Labs', () => {
  let browser, context, page;
  const BASE_URL = 'https://www.saucedemo.com/';

  // ✅ Helper to safely click links (new tab or same tab)
  async function safeClickAndReturn(name) {
    const oldPages = page.context().pages();

    // Click the link and wait a bit for new tab or SPA navigation
    await Promise.allSettled([
      page.waitForLoadState('domcontentloaded'),
      page.getByRole('link', { name, exact: true }).click(),
    ]);
    await page.waitForTimeout(2000);

    const newPages = page.context().pages();
    if (newPages.length > oldPages.length) {
      // ✅ New tab opened
      const newPage = newPages[newPages.length - 1];
      try {
        await newPage.waitForLoadState('domcontentloaded', { timeout: 10000 });
      } catch {}
      await newPage.close();
      const firstPage = page.context().pages()[0];
      await firstPage.bringToFront();
    } else {
      // ✅ Same tab navigation
      try {
        await Promise.race([
          page.goBack({ timeout: 12000 }),
          page.waitForLoadState('domcontentloaded', { timeout: 12000 }),
        ]);
        await page.waitForTimeout(1000);
      } catch (err) {
        console.warn(`⚠️ goBack failed for "${name}", reloading main page...`);
        // Fallback: reload or bring original page to front
        try {
          await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
          await page.locator('xpath=//input[@id="user-name"]').fill('standard_user');
          await page.locator('xpath=//input[@id="password"]').fill('secret_sauce');
          await page.locator('xpath=//input[@id="login-button"]').click();
          await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 10000 });
        } catch (reloadErr) {
          const firstPage = page.context().pages()[0];
          await firstPage.bringToFront();
        }
      }
    }
  }

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
      args: ['--start-maximized'],
      slowMo: 800,
    });
    context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    page = await context.newPage();
  });

  test('Login with valid username and password', async () => {
    await page.goto(BASE_URL, { timeout: 120000, waitUntil: 'domcontentloaded' });
    await page.locator('xpath=//input[@id="user-name"]').fill('standard_user');
    await page.locator('xpath=//input[@id="password"]').fill('secret_sauce');
    await page.locator('xpath=//input[@id="login-button"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 10000 });
  });

  test('Menu Navigation', async () => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="about-sidebar-link"]').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/saucelabs\.com/);
  });

  test('Footer Products Links Verification', async () => {
    await page.evaluate(() => window.scrollBy(0, 6000));
    await page.waitForTimeout(1000);

    await Promise.allSettled([
      page.waitForLoadState('domcontentloaded'),
      page.getByRole('link', { name: 'More updates' }).click(),
    ]);

    const firstPage = page.context().pages()[0];
    await firstPage.bringToFront();

    await page.locator('div').filter({ hasText: /^Products$/ }).nth(2).click();

    await safeClickAndReturn('Platform for Test');
    await safeClickAndReturn('Sauce Web Testing');
    await safeClickAndReturn('Sauce Mobile App Testing');
    await safeClickAndReturn('Mobile App Distribution');
    await safeClickAndReturn('Sauce Error Reporting');
    await safeClickAndReturn('Sauce Visual');
  });

  test('Footer Global tools links', async () => {
    await page.evaluate(() => window.scrollBy(0, 3000));
    await page.waitForTimeout(1000);

    await safeClickAndReturn('Sauce AI');
    await safeClickAndReturn('Sauce Insights');
    await safeClickAndReturn('Sauce Performance');
  });

  test('Footer Set up and integrate links', async () => {
    await page.evaluate(() => window.scrollBy(0, 3000));
    await expect(page.getByText('Set up and integrate')).toBeVisible();
    await page.waitForTimeout(1000);

    await safeClickAndReturn('Integrations & plugins');
    await safeClickAndReturn('Supported browsers and devices');
    await safeClickAndReturn('Platform configurator');
    await safeClickAndReturn('Premium Consulting Services');
  });

  test('Footer Resources links', async () => {
    await page.evaluate(() => window.scrollBy(0, 3000));
    await page.waitForTimeout(1000);

    await safeClickAndReturn('Resources by topic');
    await safeClickAndReturn('Blog');
    await safeClickAndReturn('FAQs');
    await safeClickAndReturn('Documentation');
    await safeClickAndReturn('Support');
    await safeClickAndReturn('Videos');
    await safeClickAndReturn('Webinars');
  });

  test('Company Links Verification', async () => {
    await page.evaluate(() => window.scrollBy(0, 3000));
    await page.waitForTimeout(1000);

    await safeClickAndReturn('About us');
    await safeClickAndReturn('Security');
    await safeClickAndReturn('Partners');
    await safeClickAndReturn('Careers');
    await safeClickAndReturn('News');
    await safeClickAndReturn('Contact us');
    await safeClickAndReturn('Systems status');
  });

  test.afterAll(async () => {
    // await page.waitForTimeout(2000);
    await page.pause(); // for inspection
    // await browser.close();
  });
});
