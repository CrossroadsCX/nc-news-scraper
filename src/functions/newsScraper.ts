import { scraper as newsAndObserverScraper } from '../siteScrapers/newsAndObserver.js'
import { scraper as carolinaJournalScraper } from '../siteScrapers/carolinaJournal.js'
import { scraper as businessNCScraper } from '../siteScrapers/businessNC.js'
import { scraper as triangleBusinessJournalScraper } from '../siteScrapers/triangleBusinessJournal.js'
import { scraper as ncPolicyWatchScraper } from '../siteScrapers/ncPolicyWatch.js'

export const newsScraper = async () => {
  // const newsAndObserverLinks = await newsAndObserverScraper()
  // const carolinaJournalLinks = await carolinaJournalScraper()
  // const businessNCLinks = await businessNCScraper()
  // const triangleBusinessJournalLinks = await triangleBusinessJournalScraper()
  const ncPolicyWatchLinks = await ncPolicyWatchScraper()

  // return { businessNCLinks, carolinaJournalLinks, triangleBusinessJournalLinks, newsAndObserverLinks }
  return { ncPolicyWatchLinks }
}
