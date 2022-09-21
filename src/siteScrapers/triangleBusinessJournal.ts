import puppeteer from 'puppeteer'

import { filterByDays, sortByDate } from '../helpers/dates.js'

import type { Article } from '../types'

const triangleBusinessJournalUrl = 'https://www.bizjournals.com/triangle/news/'
const baseUrl = 'https://www.bizjournals.com/'

export const scraper = async (): Promise<Article[]> => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0')
    await page.goto(triangleBusinessJournalUrl)
    await page.setViewport({
      width: 1200,
      height: 800,
    })

    console.log(`Getting ${triangleBusinessJournalUrl}`)

    const listHandle = await page.$('.primary > .item--container')

    if (listHandle) {
      const articlesHandle = await listHandle.$$('a')
      const articlesPromises = articlesHandle.map(async (article): Promise<Article> => {
        const link: string = `${baseUrl}${(await article.evaluate((el) => el.getAttribute('href')))}`
        const title: string = await article.$eval('.item__title', (el) => el.innerText)

        let dateTime = null

        try {
          const dateText = await article.$eval('time', (el) => el.innerText)
          dateTime = new Date(dateText).getTime().toString()
        } catch (err) {
          console.info(`Unable to get dateTime for ${title}`)
        }

        return {
          link,
          title,
          dateTime,
        }
      })

      const links = await Promise.all(articlesPromises)
      await browser.close()

      const sortedLinks = sortByDate(links)
      const currentLinks = filterByDays(sortedLinks, 2)

      return currentLinks
    } else {
      console.error(`Unable to get ${triangleBusinessJournalUrl} news articles.`)
    }

    await browser.close()
    return []
  } catch (err) {
    console.error(`Error getting ${triangleBusinessJournalUrl} news articles.`)
    console.error(err)
    return []
  }
}
