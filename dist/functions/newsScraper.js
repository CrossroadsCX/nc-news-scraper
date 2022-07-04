import { scraper as newsAndObserverScraper } from '../siteScrapers/newsAndObserver.js';
import { scraper as carolinaJournalScraper } from '../siteScrapers/carolinaJournal.js';
import { scraper as businessNCScraper } from '../siteScrapers/businessNC.js';
import { scraper as triangleBusinessJournalScraper } from '../siteScrapers/triangleBusinessJournal.js';
import { scraper as ncPolicyWatchScraper } from '../siteScrapers/ncPolicyWatch.js';
import { sendEmail } from '../sendinblue/sendEmail.js';
export const newsScraper = async () => {
    const businessNCLinks = await businessNCScraper();
    const carolinaJournalLinks = await carolinaJournalScraper();
    const newsAndObserverLinks = await newsAndObserverScraper();
    const ncPolicyWatchLinks = await ncPolicyWatchScraper();
    const triangleBusinessJournalLinks = await triangleBusinessJournalScraper();
    return sendEmail({
        businessNCLinks,
        carolinaJournalLinks,
        ncPolicyWatchLinks,
        newsAndObserverLinks,
        triangleBusinessJournalLinks,
    });
};
//# sourceMappingURL=newsScraper.js.map