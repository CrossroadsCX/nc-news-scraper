import puppeteer from 'puppeteer';
const newsObserverUrl = 'https://www.newsobserver.com/news/politics-government/politics-columns-blogs/under-the-dome/';
export const scraper = async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0');
        console.log(`Getting ${newsObserverUrl}`);
        await page.goto(newsObserverUrl);
        await page.setViewport({
            width: 1200,
            height: 800,
        });
        const sectionHandle = await page.$('#main-stage');
        if (sectionHandle) {
            const articlesHandle = await sectionHandle.$$('article');
            const articlesPromises = articlesHandle.map(async (article) => {
                const id = await (await article.getProperty('id')).jsonValue();
                if (id.match(/(primary-content|secondary-story-[0-9])/g)) {
                    const link = await article.$eval('h3 > a', (link) => link.getAttribute('href'));
                    const title = await article.$eval('h3 > a', (link) => link.innerText);
                    return { id, title, link, };
                    return null;
                }
                return null;
            });
            const tagValues = await Promise.all(articlesPromises);
            const filteredValues = tagValues.filter((tag) => tag !== null);
            await browser.close();
            return filteredValues;
        }
        else {
            console.error(`Unable to get ${newsObserverUrl} news articles`);
        }
        await browser.close();
        return [];
    }
    catch (err) {
        console.error(err);
        return [];
    }
};
//# sourceMappingURL=newsAndObserver.js.map