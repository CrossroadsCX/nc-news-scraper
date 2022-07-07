import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

const client = new SecretManagerServiceClient()

export const getSecret = async(
  secretName: string,
  projectName: string,
) => {
  const name = `projects/${projectName}/secrets/${secretName}/versions/latest`

  async function accessSecret() {
    const [version] = await client.accessSecretVersion({
      name,
    })

    // Extract the payload as a string
    if (version.payload && version.payload.data) {
      const payload = version.payload.data.toString()

      return payload
    } else {
      throw new Error(`Error retrieving secret - ${secretName}`)
    }
  }

  return accessSecret()
}
