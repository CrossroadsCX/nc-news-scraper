import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const client = new SecretManagerServiceClient();
export const getSecret = async (secretName, projectName) => {
    const name = `projects/${projectName}/secrets/${secretName}/versions/latest`;
    async function accessSecret() {
        const [version] = await client.accessSecretVersion({
            name,
        });
        if (version.payload && version.payload.data) {
            const payload = version.payload.data.toString();
            return payload;
        }
        else {
            throw new Error(`Error retrieving secret - ${secretName}`);
        }
    }
    return accessSecret();
};
//# sourceMappingURL=secrets.js.map