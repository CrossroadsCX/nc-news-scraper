import puppeteer from 'puppeteer';
import _ from 'lodash';
import { filterByDays, sortByDate } from '../helpers/dates.js';
const businessNCUrl = 'https://businessnc.com/exclusive-web-content/';
export const scraper = async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(businessNCUrl);
        await page.setViewport({
            width: 1200,
            height: 800,
        });
        console.log(`Getting ${businessNCUrl}`);
        const listHandle = await page.$('.td-mc1-wrap');
        if (listHandle) {
            const articlesHandle = await listHandle.$$('div');
            const articlesPromises = articlesHandle.map(async (article) => {
                const infoHandle = await article.$('.td-module-meta-info');
                const link = await infoHandle?.$eval('a', (link) => link.getAttribute('href'));
                const title = await infoHandle?.$eval('a', (link) => link.innerText);
                let dateTime = null;
                try {
                    const dateString = await article.$eval('time', (dateHandle) => dateHandle.getAttribute('datetime'));
                    dateTime = new Date(dateString).getTime().toString();
                }
                catch (err) {
                    console.info(`Unable to get dateTime for ${title}`);
                }
                return { link, title, dateTime };
            });
            const links = await Promise.all(articlesPromises);
            await browser.close();
            const filteredLinks = _.uniqBy(links.filter((link) => link?.link), 'link');
            const latestLinks = await filterByDays(filteredLinks, 2);
            const sortedLinks = sortByDate(latestLinks);
            return sortedLinks;
        }
        else {
            console.error(`Unable to get ${businessNCUrl} news articles.`);
        }
        await browser.close();
        return [];
    }
    catch (err) {
        console.error(err);
        return [];
    }
};
//# sourceMappingURL=businessNC.js.map