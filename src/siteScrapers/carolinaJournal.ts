import puppeteer from 'puppeteer'

const carolinaJournalUrl = 'https://www.carolinajournal.com/category/business/'

export const scraper = async () => {
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
    const articlesPromises = articlesHandle.map(async (article) => {
      const link = await article.$eval('a', (link) => link.getAttribute('href'))
      const title = await article.$eval('a > .details > h3', (el) => el.innerText)
      const category = await article.$eval('a > .details > .category', (el) => el.innerText)
      const description = await article.$eval('a > .details > p', (el) => el.innerText)

      return { category, description, link, title }
    })

    const links = await Promise.all(articlesPromises)

    await browser.close()
    return links
  } else {
    console.error(`Unable to get ${carolinaJournalUrl} news articles.`)
  }

  await browser.close()

  return null
}
