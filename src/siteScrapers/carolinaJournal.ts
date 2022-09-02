import puppeteer from 'puppeteer'

import type { Article } from '../types'

const carolinaJournalUrl = 'https://www.carolinajournal.com/opinion/'

export const scraper = async (): Promise<Article[]> => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0')

    await page.goto(carolinaJournalUrl)
    await page.setViewport({
      width: 1200,
      height: 800,
    })

    console.log(`Getting ${carolinaJournalUrl}`)

    const listHandle = await page.$('.newsFeed')

    if (listHandle) {
      const articlesHandle = await listHandle.$$('article')
      const articlesPromises = articlesHandle.map(async (article): Promise<Article | null> => {
        const link = await article.$eval('a', (link) => link.getAttribute('href'))
        const title = await article.$eval('a > .details > h3', (el) => el.innerText)
        const category: string = await article.$eval('a > .details > .category', (el) => el.innerText)
        // const description = await article.$eval('a > .details > p', (el) => el.innerText)

        if (category.toUpperCase() === 'OPINION') {
          return { category, link, title, dateTime: '0' }
        }

        return null
      })

      const links = await Promise.all(articlesPromises)
      const filteredLinks = links.filter((link): link is Article => link !== null)

      await browser.close()
      return filteredLinks
    } else {
      console.error(`Unable to get ${carolinaJournalUrl} news articles.`)
    }

    await browser.close()

    return []
  } catch (err) {
    console.error(err)
    return []
  }

}
