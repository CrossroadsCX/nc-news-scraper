import puppeteer from 'puppeteer';
const newsObserverUrl = 'https://www.newsobserver.com/news/business/';
export const scraper = async () => {
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
                const tag = await article.$eval('.kicker-id', (tagLink) => tagLink.innerText);
                console.log(tag);
                if (tag.toUpperCase() === 'BUSINESS') {
                    const link = await article.$eval('h3 > a', (link) => link.getAttribute('href'));
                    const title = await article.$eval('h3 > a', (link) => link.innerText);
                    const dateText = await article.$eval('.time', (dateHandle) => dateHandle.innerText);
                    const dateTime = await article.$eval('.time', (dateHandle) => dateHandle.getAttribute('datetime'));
                    return { id, title, link, tag, dateText, dateTime };
                }
                return null;
            }
            return null;
        });
        const tagValues = await Promise.all(articlesPromises);
        const filteredValues = tagValues.filter((tag) => tag);
        await browser.close();
        return filteredValues;
    }
    else {
        console.error(`Unable to get ${newsObserverUrl} news articles`);
    }
    await browser.close();
    return null;
};
//# sourceMappingURL=newsAndObserver.js.map