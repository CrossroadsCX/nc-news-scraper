import puppeteer from 'puppeteer';
import { filterByDays, sortByDate } from '../helpers/dates.js';
const politicsNCUrl = 'https://www.politicsnc.com/editors-blog/';
export const scraper = async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0');
        await page.goto(politicsNCUrl);
        await page.setViewport({
            width: 1200,
            height: 800,
        });
        console.log(`Getting ${politicsNCUrl}`);
        const listHandle = await page.$('.et_pb_ajax_pagination_container');
        if (listHandle) {
            const articlesHandle = await listHandle.$$('article');
            const articlesPromises = articlesHandle.map(async (article) => {
                const link = await article.$eval('h2.entry-title > a', (link) => link.getAttribute('href'));
                const title = await article.$eval('h2.entry-title', (el) => el.innerText);
                let dateTime = null;
                try {
                    const dateText = await article.$eval('.published', (el) => el.innerText);
                    dateTime = new Date(dateText).getTime().toString();
                }
                catch (err) {
                    console.info(`Unable to get dateTime for ${title}`);
                }
                return { link, title, dateTime };
            });
            const links = await Promise.all(articlesPromises);
            await browser.close();
            const sortedLinks = sortByDate(links);
            const currentLinks = filterByDays(sortedLinks, 2);
            return currentLinks;
        }
        else {
            console.error(`Unable to get ${politicsNCUrl} news articles`);
        }
        await browser.close();
        return [];
    }
    catch (err) {
        console.error(err);
        return [];
    }
};
//# sourceMappingURL=politicsNC.js.map