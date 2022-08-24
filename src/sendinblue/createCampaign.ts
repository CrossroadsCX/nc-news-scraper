import SIBApi from '@sendinblue/client'

import { getSecret } from '../gcloud/secrets.js'

import type { ArticleList } from '../types'

const templateId = 2
const listId = 4

export const createCampaign = async (articles: ArticleList) => {
  const APIKey = await getSecret('SIB_API_KEY', 'ncfree')

  const api = new SIBApi.EmailCampaignsApi()

  api.setApiKey(SIBApi.EmailCampaignsApiApiKeys.apiKey, APIKey)
  const emailCampaign = new SIBApi.CreateEmailCampaign()
  emailCampaign.sender = { name: 'Anna Beavon Gravely', email: 'info@ncfree.org' }
  emailCampaign.templateId = templateId
  emailCampaign.recipients = { listIds: [listId] }
  emailCampaign.params = { articles }
  emailCampaign.name = 'Word on the Street'
  emailCampaign.subject = 'NCFREE: Word on the Street'

  const data = await api.createEmailCampaign(emailCampaign)
  const { body: { id: campaignId }} = data
  const sent = await api.sendEmailCampaignNow(campaignId)
  const statusCode = sent.response.statusCode

  if (statusCode !== 204) {
    console.error('Error sending staged campaign')
    console.error(sent)
  }

  return sent
}
