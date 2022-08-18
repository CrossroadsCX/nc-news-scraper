import SIBApi from '@sendinblue/client';
import { getEmails } from '../gcloud/datastore.js';
import { getSecret } from '../gcloud/secrets.js';
const templateId = 2;
export const sendEmail = async (articles) => {
    const emails = await getEmails();
    const APIKey = await getSecret('SIB_API_KEY', 'ncfree');
    const api = new SIBApi.TransactionalEmailsApi();
    api.setApiKey(SIBApi.TransactionalEmailsApiApiKeys.apiKey, APIKey);
    const bccEmails = emails.map((email) => {
        const bccEmail = new SIBApi.SendSmtpEmailBcc();
        bccEmail.email = email;
        return bccEmail;
    });
    console.log('BCC Email Count:');
    console.log(bccEmails.length);
    const toEmail = new SIBApi.SendSmtpEmailTo();
    toEmail.email = 'info@ncfree.org';
    const sendInfo = new SIBApi.SendSmtpEmail();
    sendInfo.to = [toEmail];
    sendInfo.bcc = bccEmails;
    sendInfo.params = { articles };
    sendInfo.templateId = templateId;
    const { response, body } = await api.sendTransacEmail(sendInfo);
    return { body, statusCode: response.statusCode };
};
//# sourceMappingURL=sendEmail.js.map