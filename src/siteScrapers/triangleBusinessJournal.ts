import puppeteer from 'puppeteer'

const triangleBusinessJournalUrl = 'https://www.bizjournals.com/triangle/news/'

export type TriangleBusinessJournalLink = {
  link: string
  title: string
}

export const scraper = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto(triangleBusinessJournalUrl)
  await page.setViewport({
    width: 1200,
    height: 800,
  })

  console.log(`Getting ${triangleBusinessJournalUrl}`)

  const listHandle = await page.$('.primary > .item--container')

  if (listHandle) {
    const articlesHandle = await listHandle.$$('a')
    const articlesPromises = articlesHandle.map(async (article): Promise<TriangleBusinessJournalLink> => {
      const link: string = await article.evaluate((el) => el.getAttribute('href'))
      const title: string = await article.$eval('.item__title', (el) => el.innerText)

      return {
        link,
        title,
      }
    })

    const links = await Promise.all(articlesPromises)

    await browser.close()
    return links
  } else {
    console.error(`Unable to get ${triangleBusinessJournalUrl} news articles.`)
  }


  await browser.close()
  return null
}
