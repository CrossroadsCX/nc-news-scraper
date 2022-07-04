import SIBApi from '@sendinblue/client';
const templateId = 2;
const testEmail = 'chris@crossroadscx.com';
const APIKey = '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';
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
    console.log(response.statusCode);
    return { body, statusCode: response.statusCode };
};
//# sourceMappingURL=sendEmail.js.map