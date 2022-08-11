import { getEmails } from './dist/gcloud/datastore.js'

const main = async () => {
  const emails = await getEmails()

  return emails
}

main().then((res) => { console.log(res); console.log(res.length)}).catch((err) => { console.error(err)})
