import { scraper as newsAndObserverScraper } from '../siteScrapers/newsAndObserver.js';
import { scraper as carolinaJournalScraper } from '../siteScrapers/carolinaJournal.js';
import { scraper as businessNCScraper } from '../siteScrapers/businessNC.js';
export const newsScraper = async () => {
    const newsAndObserverLinks = await newsAndObserverScraper();
    const carolinaJournalLinks = await carolinaJournalScraper();
    const businessNCLinks = await businessNCScraper();
    return { businessNCLinks, carolinaJournalLinks, newsAndObserverLinks };
};
//# sourceMappingURL=newsScraper.js.map