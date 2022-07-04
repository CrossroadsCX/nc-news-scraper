import SIBApi from '@sendinblue/client';
const templateId = 2;
const testEmail = 'chris@crossroadscx.com';
const APIKey = '';
export const sendEmail = async (articles) => {
    const api = new SIBApi.TransactionalEmailsApi();
    api.setApiKey(SIBApi.TransactionalEmailsApiApiKeys.apiKey, APIKey);
    const sendInfo = new SIBApi.SendSmtpEmail();
    const toEmail = new SIBApi.SendSmtpEmailTo();
    toEmail.email = testEmail;
    sendInfo.to = [toEmail];
    sendInfo.params = { articles };
    sendInfo.templateId = templateId;
    const { response, body } = await api.sendTransacEmail(sendInfo);
    return { body, statusCode: response.statusCode };
};
//# sourceMappingURL=sendEmail.js.map