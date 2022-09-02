import puppeteer from 'puppeteer'
import _ from 'lodash'

import { sortByDate } from '../helpers/dates.js'

import type { Article } from '../types'

const businessNCUrl = 'https://businessnc.com/exclusive-web-content/'

export type BusinessNCLink = {
  link: string
  title: string
}

export const scraper = async (): Promise<Article[]> => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto(businessNCUrl)
    await page.setViewport({
      width: 1200,
      height: 800,
    })

    console.log(`Getting ${businessNCUrl}`)

    const listHandle = await page.$('.td-mc1-wrap')

    if (listHandle) {
      const articlesHandle = await listHandle.$$('div')
      const articlesPromises = articlesHandle.map(async (article): Promise<Article> => {
        const infoHandle = await article.$('.td-module-meta-info')

        const link: string = await infoHandle?.$eval('a', (link) => link.getAttribute('href'))
        const title: string = await infoHandle?.$eval('a', (link) => link.innerText)

        let dateTime = '0'
        try {
          const dateString = await article.$eval('time', (dateHandle) => dateHandle.getAttribute('datetime'))

          dateTime = new Date(dateString).getTime().toString()
        } catch (err) {
          console.info(`Unable to get dateTime for ${title}`)
        }

        return { link, title, dateTime }

      })

      const links = await Promise.all(articlesPromises)
      const filteredLinks = _.uniqBy(links.filter((link) => link?.link), 'link')

      await browser.close()
      const sortedLinks = sortByDate(filteredLinks)
      return sortedLinks
    } else {
      console.error(`Unable to get ${businessNCUrl} news articles.`)
    }

    await browser.close()
    return []
  } catch (err) {
    console.error(err)
    return []
  }
}
