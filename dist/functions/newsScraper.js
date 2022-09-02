import { scraper as newsAndObserverScraper } from '../siteScrapers/newsAndObserver.js';
import { scraper as carolinaJournalScraper } from '../siteScrapers/carolinaJournal.js';
import { scraper as businessNCScraper } from '../siteScrapers/businessNC.js';
import { scraper as triangleBusinessJournalScraper } from '../siteScrapers/triangleBusinessJournal.js';
import { scraper as ncPolicyWatchScraper } from '../siteScrapers/ncPolicyWatch.js';
import { scraper as politicsNCScraper } from '../siteScrapers/politicsNC.js';
import { createCampaign } from '../sendinblue/createCampaign.js';
const numLinks = 3;
export const newsScraper = async () => {
    const businessNCLinks = (await businessNCScraper()).slice(0, numLinks);
    const carolinaJournalLinks = (await carolinaJournalScraper()).slice(0, numLinks);
    const newsAndObserverLinks = (await newsAndObserverScraper()).slice(0, numLinks);
    const ncPolicyWatchLinks = (await ncPolicyWatchScraper()).slice(0, numLinks);
    const politicsNCLinks = (await politicsNCScraper()).slice(0, numLinks);
    const triangleBusinessJournalLinks = (await triangleBusinessJournalScraper()).slice(0, numLinks);
    const articles = {
        businessNCLinks,
        carolinaJournalLinks,
        ncPolicyWatchLinks,
        newsAndObserverLinks,
        politicsNCLinks,
        triangleBusinessJournalLinks,
    };
    return createCampaign(articles);
    return articles;
};
//# sourceMappingURL=newsScraper.js.map