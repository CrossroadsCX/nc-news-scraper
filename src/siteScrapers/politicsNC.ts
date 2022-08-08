import puppeteer from 'puppeteer'

import type { Article } from '../types'

const politicsNCUrl = 'https://www.politicsnc.com/editors-blog/'

export const scraper = async (): Promise<Article[]> => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0')

  await page.goto(politicsNCUrl)
  await page.setViewport({
    width: 1200,
    height: 800,
  })

  console.log(`Getting ${politicsNCUrl}`)

  const listHandle = await page.$('.et_pb_ajax_pagination_container')

  if (listHandle) {
    const articlesHandle = await listHandle.$$('article')
    const articlesPromises = articlesHandle.map(async (article): Promise<Article> => {
      const link = await article.$eval('h2.entry-title > a', (link) => link.getAttribute('href'))
      const title = await article.$eval('h2.entry-title', (el) => el.innerText)

      return { link, title }
    })

    const links = await Promise.all(articlesPromises)
    await browser.close()
    return links
  } else {
    console.error(`Unable to get ${politicsNCUrl} news articles`)
  }

  await browser.close()
  return []
}
