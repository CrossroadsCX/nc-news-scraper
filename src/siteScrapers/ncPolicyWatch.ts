import puppeteer from 'puppeteer'

const ncPolicyWatchUrl = 'https://ncpolicywatch.com/category/articles/news/'

export const scraper = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto(ncPolicyWatchUrl)

  await page.setViewport({
    width: 1200,
    height: 800,
  })

  console.log(`Getting ${ncPolicyWatchUrl}`)

  const listHandle = await page.$('.all-layout')

  if (listHandle) {
    const articlesHandle = await listHandle.$$('[role=article]')
    const articlesPromises = articlesHandle.map(async (article) => {
      const title: string = await article.$eval('.entry-title > a', (el) => el.innerText)
      const link: string = await article.$eval('.entry-title > a', (el) => el.getAttribute('href'))
      return { title, link }
    })

    const links = await Promise.all(articlesPromises)

    await browser.close()
    return links
  } else {
    console.error(`Unable to get ${ncPolicyWatchUrl} news articles.`)
  }
}
