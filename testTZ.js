import { convertTZ, getEasternTime } from './dist/helpers/dates.js'

const main = async () => {
  const result = await getEasternTime()

  return result
}

main()
  .then((result) => {
    console.log(result)
  }).catch((err) => {
    console.log(err)
  })
