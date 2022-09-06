import axios from 'axios'
import { differenceInCalendarDays } from 'date-fns'

import { Article } from '../types'

type WorldTimeAPIResponse = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: string;
  dst_offset: number;
  dst_until: string;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
}

/**
 * Filter function used to remove articles that are older than $days days
 * @param articleDate
 * @param currentDate
 * @param days
 * @returns
 */
const articlesDayFilter = (articleDate: Date, currentDate: Date, days: number): boolean => {
  const daysDifference = differenceInCalendarDays(currentDate, articleDate)

  if (daysDifference <= days) {
    return true
  }

  return false
}

/**
 * Filters articles that are older than the specified number of days in Eastern Time
 * @param articles
 * @param days
 * @returns
 */
export const filterByDays = async (articles: Article[], days = 2): Promise<Article[]> => {
  const ETDate = await getEasternTime()

  const filteredArticles = articles.filter((article) => {
    if (article.dateTime) {
      const articleDate = new Date(parseInt(article.dateTime))
      return articlesDayFilter(articleDate, ETDate, days)
    }

    return false
  })

  return filteredArticles
}

/**
 * Sorts the given articles by their dateTime property.
 * @param articles
 * @returns
 */
export const sortByDate = (articles: Article[]): Article[] => {
  return articles.sort((a, b) => {
    if (a.dateTime && b.dateTime) {
      return parseInt(b.dateTime) - parseInt(a.dateTime)
    }

    return 0
  })
}

/**
 * Converts a given date to the timezone specified in the tzString parameter.
 * @param date
 * @param tzString
 * @returns
 */
export const convertTZ = (date: Date, tzString: string): Date => {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }))
}

/**
 * Call the WorldTimeAPI to get the current date and time in Eastern Time
 * @returns Eastern Time Date
 */
export const getEasternTime = async (): Promise<Date> => {
  const { data, status } = await axios.get<WorldTimeAPIResponse>('http://worldtimeapi.org/api/timezone/America/New_York')

  if (status !== 200) {
    throw new Error('Error fetching time')
  }

  const ETDate = new Date(data.datetime)

  return ETDate
}
