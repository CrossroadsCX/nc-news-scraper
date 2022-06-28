import puppeteer from 'puppeteer';
const triangleBusinessJournalUrl = '';
export const scraper = async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(triangleBusinessJournalUrl);
    await page.setViewport({
        width: 1200,
        height: 800,
    });
    console.log(`Getting ${triangleBusinessJournalUrl}`);
    const listHandle = await page.$('');
};
//# sourceMappingURL=ncPolicyWatch_bak.js.map