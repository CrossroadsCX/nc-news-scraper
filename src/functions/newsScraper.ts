import { scraper as newsAndObserverScraper } from '../siteScrapers/newsAndObserver.js'
import { scraper as carolinaJournalScraper } from '../siteScrapers/carolinaJournal.js'
import { scraper as businessNCScraper } from '../siteScrapers/businessNC.js'
import { scraper as triangleBusinessJournalScraper } from '../siteScrapers/triangleBusinessJournal.js'
import { scraper as ncPolicyWatchScraper } from '../siteScrapers/ncPolicyWatch.js'

import { sendEmail } from '../sendinblue/sendEmail.js'

const numLinks = 3

export const newsScraper = async () => {
  const businessNCLinks = (await businessNCScraper()).slice(0, numLinks)
  const carolinaJournalLinks = (await carolinaJournalScraper()).slice(0, numLinks)
  const newsAndObserverLinks = (await newsAndObserverScraper()).slice(0, numLinks)
  const ncPolicyWatchLinks = (await ncPolicyWatchScraper()).slice(0, numLinks)
  const triangleBusinessJournalLinks = (await triangleBusinessJournalScraper()).slice(0, numLinks)

  const articles = {
    businessNCLinks,
    carolinaJournalLinks,
    ncPolicyWatchLinks,
    newsAndObserverLinks,
    triangleBusinessJournalLinks,
  }

  return sendEmail(articles)
}
