import { importEmails } from './dist/gcloud/datastore.js'

const emails = []

const main = async () => {
  return importEmails(emails)
}

main().then((res) => { console.log(res)}).catch((err) => { console.error(err)})
