import { newsScraper } from './dist/functions/newsScraper.js'

const main = async () => {
  const results = await newsScraper()

  return results
}

main()
  .then((results) => {
    console.log('Finished.')
    console.log(results)
    process.exit(0)
  }).catch((err) => {
    console.error(err)
    process.exit(1)
  })
