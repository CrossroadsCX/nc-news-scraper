import puppeteer from 'puppeteer';
const triangleBusinessJournalUrl = 'https://www.bizjournals.com/triangle/news/';
export const scraper = async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0');
    await page.goto(triangleBusinessJournalUrl);
    await page.setViewport({
        width: 1200,
        height: 800,
    });
    console.log(`Getting ${triangleBusinessJournalUrl}`);
    const listHandle = await page.$('.primary > .item--container');
    if (listHandle) {
        const articlesHandle = await listHandle.$$('a');
        const articlesPromises = articlesHandle.map(async (article) => {
            const link = await article.evaluate((el) => el.getAttribute('href'));
            const title = await article.$eval('.item__title', (el) => el.innerText);
            return {
                link,
                title,
            };
        });
        const links = await Promise.all(articlesPromises);
        await browser.close();
        return links;
    }
    else {
        console.error(`Unable to get ${triangleBusinessJournalUrl} news articles.`);
    }
    await browser.close();
    return null;
};
//# sourceMappingURL=triangleBusinessJournal.js.map