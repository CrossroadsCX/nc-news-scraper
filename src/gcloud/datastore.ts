import { Datastore } from '@google-cloud/datastore'

const datastore = new Datastore({ projectId: 'ncfree' })

type EmailObject = {
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
}

export const getEmails = async () => {

  const query = datastore.createQuery('Subscriber')
  query.filter('enabled', true)

  const [emailObjects] = await datastore.runQuery(query)

  const emails = emailObjects.map((obj: EmailObject) => obj.email)

  return emails
}

export const importEmails = async (emails: string[]) => {
  const subscriberKey = datastore.key('Subscriber')
  const promises = emails.map(async (email) => {
    const entity = {
      key: subscriberKey,
      data: [
        { name: 'email', value: email },
        { name: 'enabled', value: true},
      ]
    }

    await datastore.save(entity)
    console.log(`Saved ${email}`)
    return
  })

  const results = await Promise.all(promises)
  return results
}
