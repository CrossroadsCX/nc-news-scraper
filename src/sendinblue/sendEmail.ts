import SIBApi, { AttributesApi, SendSmtpEmailTo } from '@sendinblue/client'

import type { ArticleList } from '../types'

const templateId = 2
const testEmail = ['']

const APIKey = ''

export const sendEmail = async (articles: ArticleList) => {
  const api = new SIBApi.TransactionalEmailsApi()
  api.setApiKey(SIBApi.TransactionalEmailsApiApiKeys.apiKey, APIKey)

  const bccEmails = testEmail.map((email) => {
    const bccEmail = new SIBApi.SendSmtpEmailBcc()
    bccEmail.email = email

    return bccEmail
  })

  const toEmail = new SIBApi.SendSmtpEmailTo()
  toEmail.email = 'info@ncfree.org'

  const sendInfo = new SIBApi.SendSmtpEmail()
  sendInfo.to = [toEmail]
  sendInfo.bcc = bccEmails
  sendInfo.params = { articles }
  sendInfo.templateId = templateId

  const { response, body } = await api.sendTransacEmail(sendInfo)

  return { body, statusCode: response.statusCode }
}
