import SIBApi, { AttributesApi, SendSmtpEmailTo } from '@sendinblue/client'

import { getEmails } from '../gcloud/datastore.js'
import { getSecret } from '../gcloud/secrets.js'

import type { ArticleList } from '../types'

const templateId = 2
// const testEmail = ['chris@crossroadscx.com']

export const sendEmail = async (articles: ArticleList) => {
  try {
    const emails = await getEmails()

    const APIKey = await getSecret('SIB_API_KEY', 'ncfree')

    const api = new SIBApi.TransactionalEmailsApi()
    api.setApiKey(SIBApi.TransactionalEmailsApiApiKeys.apiKey, APIKey)

    const bccEmails = emails.map((email) => {
      const bccEmail = new SIBApi.SendSmtpEmailBcc()
      bccEmail.email = email

      return bccEmail
    })

    // console.log(bccEmails)
    console.log('BCC Email Count:')
    console.log(bccEmails.length)

    const toEmail = new SIBApi.SendSmtpEmailTo()
    toEmail.email = 'info@ncfree.org'

    const sendInfo = new SIBApi.SendSmtpEmail()
    sendInfo.to = [toEmail]
    sendInfo.bcc = bccEmails
    sendInfo.params = { articles }
    sendInfo.templateId = templateId

    const { response, body } = await api.sendTransacEmail(sendInfo)

    return { body, statusCode: response.statusCode }
  } catch (err) {
    console.error(`Error sending email.`)
    console.error(err)
    return { body: err, statusCode: 500 }
  }

}
