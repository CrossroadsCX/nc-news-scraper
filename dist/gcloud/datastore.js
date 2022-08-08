import { Datastore } from '@google-cloud/datastore';
const datastore = new Datastore({ projectId: 'ncfree' });
export const getEmails = async () => {
    const query = datastore.createQuery('Subscriber');
    query.filter('enabled', true);
    const [emailObjects] = await datastore.runQuery(query);
    const emails = emailObjects.map((obj) => obj.email);
    return emails;
};
//# sourceMappingURL=datastore.js.map