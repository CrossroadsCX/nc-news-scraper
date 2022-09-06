import puppeteer from 'puppeteer';
import { filterByDays, sortByDate } from '../helpers/dates.js';
const ncPolicyWatchUrl = 'https://ncpolicywatch.com/category/articles/news/';
export const scraper = async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(ncPolicyWatchUrl);
        await page.setViewport({
            width: 1200,
            height: 800,
        });
        console.log(`Getting ${ncPolicyWatchUrl}`);
        const listHandle = await page.$('.all-layout');
        if (listHandle) {
            const articlesHandle = await listHandle.$$('[role=article]');
            const articlesPromises = articlesHandle.map(async (article) => {
                const title = await article.$eval('.entry-title > a', (el) => el.innerText);
                const link = await article.$eval('.entry-title > a', (el) => el.getAttribute('href'));
                let dateTime = null;
                try {
                    const dateText = await article.$eval('.post-date-bd > span', (el) => el.innerText);
                    dateTime = new Date(dateText).getTime().toString();
                }
                catch (err) {
                    console.info(`Unable to get dateTime for ${title}`);
                }
                return { title, link, dateTime };
            });
            const links = await Promise.all(articlesPromises);
            await browser.close();
            const sortedLinks = sortByDate(links);
            const latestLinks = await filterByDays(sortedLinks, 2);
            return latestLinks;
        }
        else {
            console.error(`Unable to get ${ncPolicyWatchUrl} news articles.`);
        }
        await browser.close();
        return [];
    }
    catch (err) {
        console.error(err);
        return [];
    }
};
//# sourceMappingURL=ncPolicyWatch.js.map