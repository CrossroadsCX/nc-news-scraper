import puppeteer from 'puppeteer'
import _ from 'lodash'

const businessNCUrl = 'https://businessnc.com/exclusive-web-content/'

export type BusinessNCLink = {
  link: string
  title: string
}

export const scraper = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto(businessNCUrl)
  await page.setViewport({
    width: 1200,
    height: 800,
  })

  console.log(`Getting ${businessNCUrl}`)

  const listHandle = await page.$('.td-mc1-wrap')

  console.log(listHandle)

  if (listHandle) {
    const articlesHandle = await listHandle.$$('div')
    const articlesPromises = articlesHandle.map(async (article): Promise<BusinessNCLink | null> => {
      const infoHandle = await article.$('.td-module-meta-info')

      const link: string = await infoHandle?.$eval('a', (link) => link.getAttribute('href'))
      const title: string = await infoHandle?.$eval('a', (link) => link.innerText)

      return { link, title }

    })

    const links = await Promise.all(articlesPromises)
    const filteredLinks = _.uniqBy(links.filter((link) => link?.link), 'link')

    await browser.close()
    return filteredLinks
  } else {
    console.error(`Unable to get ${businessNCUrl} news articles.`)
  }

  await browser.close()
  return null
}