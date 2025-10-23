import { test, expect, chromium } from '@playwright/test';

test.describe.serial('Swag Labs', () => {

  let browser, context, page;
  const BASE_URL = 'https://www.saucedemo.com/';

  test.beforeAll(async () => {
    browser = await chromium.launch({headless: false,args: ['--start-maximized'],slowMo: 1000});
    context = await browser.newContext({viewport: null,deviceScaleFactor: undefined});
    page = await context.newPage();
  });

  test("Login with valid username and password", async () => {
     await page.goto(BASE_URL, { timeout: 120000 });
     await page.locator("xpath=//input[@id='user-name']").fill("standard_user");
     await page.locator("xpath=//input[@id='password']").fill("secret_sauce");
     await page.locator("xpath=//input[@id='login-button']").click();
  });

  test("Menu Navigation", async () => {
      await page.getByRole('button', { name: 'Open Menu' }).click();
      await page.locator('[data-test="about-sidebar-link"]').click();
      await expect(page).toHaveURL('https://saucelabs.com/');
  });

  test("Verify the Banner", async () => {
    await expect(page.getByText(/Real talk: How agentic AI is changing software testing today/i)).toBeVisible({ timeout: 15000 });
  });
  
  test("Verify the Header", async () => {
    await page.waitForLoadState('domcontentloaded');

    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/Sauce Labs/);
    await expect (header).toHaveText(/Products/);
    await expect (header).toHaveText(/Resources/);
    await expect (header).toHaveText(/Developers/);
    await expect (header).toHaveText(/Pricing/);
  
    const headers = page.locator("//div[@class='MuiStack-root css-3a2c0r']");
    await expect(headers).toHaveCount(4);

    // Verify header links are visible
    await expect(page.getByRole('link', { name: 'Saucelabs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Pricing' })).toBeVisible();

    // Verify header buttons are visible
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Request a demo' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Try it free' })).toBeVisible();
  });

  test('Verify Products dropdown content', async () => {

    await page.waitForSelector('header');
    const productsMenu = page.locator('header >> text=Products').first();
    await productsMenu.hover();
    await expect(page.getByRole('link', { name: 'Saucelabs' })).toBeVisible();

    // ✅ Verify all visible dropdown content
    await expect(page.getByRole('link', { name: 'location Platform for Test' })).toBeVisible();
    await expect(page.locator("xpath=//a[@href='/products/cross-browser-testing']//div[@class='MuiBox-root css-d416pa']")).toBeVisible();
    await expect(page.locator("xpath=//span[text()='Sauce Mobile']")).toBeVisible();
    await expect(page.locator("(//span[contains(text(), 'Mobile App Distribution')])[1]")).toBeVisible();
    await expect(page.locator("(//span[contains(@class, 'MuiTypography-buttonLabel') and normalize-space(text())='Sauce Visual' and not(contains(@style, 'none'))])[1]")).toBeVisible();
  
    await expect(page.locator("xpath=//span[contains(text(),'Setup & integrate')]")).toBeVisible();
    await expect(page.locator("xpath=//a[@href='/products/integrations-and-plugins']//div[@class='MuiBox-root css-d416pa']")).toBeVisible();
    await expect(page.locator("(//span[text()='Supported browsers & devices'])[1]")).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Platform configurator' })).toBeVisible();
    await expect(page.getByText('Demo center')).toBeVisible();
    await expect(page.getByRole('banner').getByText('Global tools')).toBeVisible();
      
    await expect(page.getByRole('link', { name: 'location Sauce AI' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Performance' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Insights' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Take a product tour' })).toBeVisible();
  });

   test('Verify Solutions dropdown content', async () => {

    await page.waitForSelector('header');
    const productsMenu = page.locator("xpath=//span[normalize-space()='Solutions']").first();
    await productsMenu.hover();

    // ✅ Verify all visible dropdown content
    await expect(page.locator("xpath=//span[normalize-space()='Enterprise Solutions']")).toBeVisible();
    await expect(page.locator("xpath=//span[normalize-space()='Enterprise Testing Platform']")).toBeVisible();
    await expect(page.locator("xpath=//div[@class='MuiBox-root css-0']//span[contains(text(), 'Premium Consulting Services')]")).toBeVisible();
    await expect(page.locator("xpath=//span[normalize-space()='Enterprise Support']")).toBeVisible();
    await expect(page.locator("xpath=//span[normalize-space()='Use Cases']")).toBeVisible();
    await expect(page.locator("xpath=//span[normalize-space()='CI/CD pipeline optimization']")).toBeVisible();

    await expect(page.getByRole('link', { name: 'location Mobile App Distribution' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Continuous testing' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Scalable test' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Crash & error' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Test analytics' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Debugging' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Visual testing' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Mobile application' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Visual testing' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Accessibility Testing' })).toBeVisible();

    await expect(page.getByText('Industries')).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Financial Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Retail' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Insurance' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Healthcare' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Gaming' })).toBeVisible();
  });

  test('Verify Developer dropdown content', async () => {

    await page.waitForSelector('header');
    const productsMenu = page.locator("xpath=//span[normalize-space()='Developers']").first();
    await productsMenu.hover();
    
    // ✅ Verify all visible dropdown content
    await expect(page.locator("xpath=//span[normalize-space()='Resources for devs & testers']")).toBeVisible();

    await expect(page.getByRole('link', { name: 'Documentation How to use' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Changelog See what\'s new' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Support By framework' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'FAQs Learn more about our' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Selenium' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cypress' })).toBeVisible();
    await expect(page.getByRole('link', {name: 'Appium' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Playwright' })).toBeVisible();

    await expect(page.getByText('Getting started guides')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mobile app testing', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Web app testing' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CI', exact: true })).toBeVisible();

    await expect(page.getByText('Integrations').nth(1)).toBeVisible();
    await expect(page.getByRole('link', { name: 'location CI/CD' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Test automation' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Test management' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Test creation' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Accessibility' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location API Management' })).toBeVisible();
    await expect(page.getByText('Set up & configure')).toBeVisible();

    await expect(page.getByText('Set up & configure')).toBeVisible();
    await expect(page.getByText('Set up & configure')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Integrations', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Supported browsers & devices' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Supported browsers & devices' })).toBeVisible();
    await expect(page.getByRole('banner').getByRole('link', { name: 'Platform configurator' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Test configuration' })).toBeVisible();
  });
  
  test("Verify Developer dropdown Resources", async () => {
    await page.waitForSelector('header');
    const productsMenu = page.getByRole('banner').getByText('Resources', { exact: true }).first();
    await productsMenu.hover();

    // ✅ Verify Resources dropdown content
    await expect(page.getByText('Explore & learn')).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Blog Expert insights' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Webinars Continued' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Videos Watch & learn' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Reports Industry &' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location White papers In-' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Demos Explore the' })).toBeVisible();

    await expect(page.getByText('Why Sauce Labs?')).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Case studies' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location TEI Study The ROI of' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Data sheets Product' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'location Security Our' })).toBeVisible();

    await expect(page.getByText('Discover by topic')).toBeVisible();
    await expect(page.getByRole('link', { name: 'All topics' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Automated testing' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mobile testing' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Selenium' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Appium' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cross-browser testing' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CI/CD' })).toBeVisible();

    await expect(page.getByText('What’s new')).toBeVisible();
    await expect(page.getByRole('link', { name: '7 Ways to Test Smarter with' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'The Testing Imperative: How' })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Request a demo' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Try it free' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'search' })).toBeVisible();

  });

  test("Home page verification", async () => {  

    await expect(page.getByRole('heading', { name: 'Build apps users love with AI' })).toBeVisible();
    await expect(page.getByText('Power your mobile and web')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign up for free' }).first()).toBeVisible();    
    await expect(page.getByRole('button', { name: 'Book a demo' })).toBeVisible
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(page.getByText('+bn')).toBeVisible();
    await expect(page.getByText('TESTS EXECUTED')).toBeVisible();
    await expect(page.getByText('300k')).toBeVisible();
    await expect(page.getByText('ACTIVE USERS')).toBeVisible();
    await expect(page.getByText('9000+')).toBeVisible();
    await expect(page.getByText('REAL DEVICES', { exact: true })).toBeVisible();
    await expect(page.getByText('2500+')).toBeVisible();
    await expect(page.getByText('EMUSIMS AND BROWSER/OSES')).toBeVisible();
    await expect(page.getByText('Built by founders of Selenium')).toBeVisible();
    await expect(page.locator('g:nth-child(11) > g > path')).toBeVisible();
    await page.mouse.move(0, 0);
  }) 

  test("Verify the Card Section-1", async () => {  
    await page.evaluate(() => {
       window.scrollBy(0, 1000);
    }); 
    await expect(page.getByRole('heading', { name: 'ENTERPRISE-READY. AI-DRIVEN.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'One Platform for Continuous' })).toBeVisible();
    await expect(page.getByText('Ensure quality at every stage')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Low content' })).toBeVisible();

    await page.getByRole('button', { name: 'AI-Powered Insights' }).click();
    await page.getByRole('button', { name: 'Mobile App Testing' }).click();
    await page.getByRole('button', { name: 'Web Testing' }).click();
    await page.getByRole('button', { name: 'Mobile App Distribution' }).click();
    await page.getByRole('button', { name: 'Error Reporting' }).click();
    await page.getByRole('button', { name: 'Visual Testing' }).click();
  });

  test("Verify the Card Section-2", async () => {  
    await page.evaluate(() => {
       window.scrollBy(0, 1500);
    }); 
    await page.locator('.MuiBox-root.css-0 > .MuiBox-root.css-b8pqf7 > .MuiContainer-root > .MuiStack-root.css-ktxroh').click();
    await expect(page.getByRole('heading', { name: 'CASE STUDIES' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The secret sauce behind every' })).toBeVisible();
    await expect(page.getByText('Discover how leading brands')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Why our customers love Sauce' })).toBeVisible();
  });

  
  test.afterAll(async () => {
     await page.pause();
     //await browser.close();
  });
});