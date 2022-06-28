import { scraper as ncPolicyWatchScraper } from '../siteScrapers/ncPolicyWatch.js';
export const newsScraper = async () => {
    const ncPolicyWatchLinks = await ncPolicyWatchScraper();
    return { ncPolicyWatchLinks };
};
//# sourceMappingURL=newsScraper.js.map