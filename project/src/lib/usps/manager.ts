interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    issued_at?: number;
    status?: string;
}

/**
 * A manager for the access tokens required for Oauth 2.0 apis
 * In this case, specifically for the USPS API
 */
class TokenManager {
    private accessToken: string | null = null;
    private expiresAt: number = 0;
    private refreshPromise: Promise<string> | null = null;
    // Buffer time (in ms) before actual expiration to refresh the token
    // Using 5 minutes buffer to ensure we don't use tokens close to expiry
    private readonly REFRESH_BUFFER_MS = 5 * 60 * 1000;

    /**
   * Creates a new instance of the TokenManager
   * @param clientId - The API client ID
   * @param clientSecret - The API client secret
   * @param tokenUrl - The URL for the token endpoint
   * @param scopes - the endpoints you need access to, will be converted to space delimited string
   */
    constructor(
        private readonly clientId: string,
        private readonly clientSecret: string,
        private readonly tokenUrl: string,
        private readonly scopes: string[],
    ){}

    private async fetchAccessToken(): Promise<string> {
        try {
            const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')
            const response = await fetch(this.tokenUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    scope: this.scopes.join(" "),
        
                }),
            });
    
            if (!response.ok) {
                const e = await response.text();
                throw new Error(`[USPS] fetchAccessToken() failed with status ${response.status} [Error] ${e}`);
            }
    
            const data = await response.json() as AccessTokenResponse;

            if (!data.access_token || !data.expires_in || data.token_type !== 'Bearer') {
                throw new Error('Invalid token response format');
            }

            const issuedAt = data.issued_at ? data.issued_at : Date.now();
            this.expiresAt = issuedAt + (data.expires_in * 1000);
            this.accessToken = data.access_token;

            return this.accessToken;
        } catch (error) {
            this.accessToken = null;
            this.expiresAt = 0;
            throw error;
        }
    };

    async getToken(): Promise<string> {
        if (this.accessToken && this.expiresAt > Date.now() + this.REFRESH_BUFFER_MS) {
            return this.accessToken;
        }
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = this.fetchAccessToken()
            .then((token) => {
                return token;
            })
            .catch((error) => {
                this.refreshPromise = null;
                throw error;
            })
            .finally(() => {
                this.refreshPromise = null;
            })
        return this.refreshPromise;
    }
}

const uspsManager = new TokenManager(
    process.env.USPS_CLIENT_ID!,
    process.env.USPS_CLIENT_SECRET!,
    `${process.env.USPS_URL!}/oauth2/v3/token`,
    ["shipments"]
)

export default uspsManager;