import { Article } from '../types'

export const sortByDate = (articles: Article[]): Article[] => {
  return articles.sort((a, b) => {
    return parseInt(b.dateTime) - parseInt(a.dateTime)
  })
}
