import puppeteer from 'puppeteer'

import type { Article } from '../types'

const newsObserverUrl = 'https://www.newsobserver.com/news/business/'

export const scraper = async (): Promise<Article[]> => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0')

  console.log(`Getting ${newsObserverUrl}`)

  await page.goto(newsObserverUrl)
  await page.setViewport({
    width: 1200,
    height: 800,
  })

  const sectionHandle = await page.$('#main-stage')

  if (sectionHandle) {
    const articlesHandle = await sectionHandle.$$('article')


    const articlesPromises = articlesHandle.map(async (article): Promise<Article | null> => {

      // Grab the article id
      const id: string = await (await article.getProperty('id')).jsonValue()

      // Filter out non-article content ( eg. ads )
      if (id.match(/(primary-content|secondary-story-[0-9])/g)) {
        // Grab the tag name
        const tag: string = await article.$eval('.kicker-id', (tagLink) => tagLink.innerText)

        // Only select the articles tagged as business
        if (tag.toUpperCase() === 'BUSINESS') {
          // Grab the title
          const link: string = await article.$eval('h3 > a', (link) => link.getAttribute('href'))
          const title: string = await article.$eval('h3 > a', (link) => link.innerText)

          // Grab the date information
          const dateText: string = await article.$eval('.time', (dateHandle) => dateHandle.innerText)
          const dateTime: string = await article.$eval('.time', (dateHandle) => dateHandle.getAttribute('datetime'))

          return { id, title, link, tag, dateText, dateTime }
        }

        return null
      }

      return null
    })

    const tagValues = await Promise.all(articlesPromises)
    const filteredValues = tagValues.filter((tag): tag is Article => tag !== null)

    await browser.close()

    return filteredValues
  } else {
    console.error(`Unable to get ${newsObserverUrl} news articles`)
  }

  await browser.close()

  return []
}
