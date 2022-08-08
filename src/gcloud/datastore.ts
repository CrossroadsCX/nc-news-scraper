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
