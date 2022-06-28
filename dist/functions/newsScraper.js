import { scraper as newsAndObserverScraper } from '../siteScrapers/newsAndObserver.js';
import { scraper as carolinaJournalScraper } from '../siteScrapers/carolinaJournal.js';
import { scraper as businessNCScraper } from '../siteScrapers/businessNC.js';
import { scraper as triangleBusinessJournalScraper } from '../siteScrapers/triangleBusinessJournal.js';
export const newsScraper = async () => {
    const newsAndObserverLinks = await newsAndObserverScraper();
    const carolinaJournalLinks = await carolinaJournalScraper();
    const businessNCLinks = await businessNCScraper();
    const triangleBusinessJournalLinks = await triangleBusinessJournalScraper();
    return { businessNCLinks, carolinaJournalLinks, triangleBusinessJournalLinks, newsAndObserverLinks };
};
//# sourceMappingURL=newsScraper.js.map