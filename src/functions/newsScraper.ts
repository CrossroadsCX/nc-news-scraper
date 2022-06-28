import { scraper as newsAndObserverScraper } from '../siteScrapers/newsAndObserver.js'
import { scraper as carolinaJournalScraper } from '../siteScrapers/carolinaJournal.js'

export const newsScraper = async () => {
  const newsAndObserverLinks = await newsAndObserverScraper()
  const carolinaJournalLinks = await carolinaJournalScraper()

  return { carolinaJournalLinks, newsAndObserverLinks }
  // return { carolinaJournalLinks }
}
