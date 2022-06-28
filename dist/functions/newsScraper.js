import { scraper as businessNCScraper } from '../siteScrapers/businessNC.js';
export const newsScraper = async () => {
    const businessNCLinks = await businessNCScraper();
    return { businessNCLinks };
};
//# sourceMappingURL=newsScraper.js.map