import { Base } from "../base";
import { AuthResponse, NewAuth, AuthResponseWithHeaders } from "./types";

const resource = "auth";

export class Auth extends Base {
  private readonly publicKey: string;
  private readonly privateKey: string;
  private accessToken: string | null;

  constructor(publicKey: string, privateKey: string) {
    super({ apiKey: "", baseUrl: "https://api-prod.getmessenger.ng" });
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  async generateBearerToken(): Promise<string | null> {
    if (!this.accessToken) {
      const credentials: NewAuth = {
        username: this.publicKey,
        password: this.privateKey,
      };

      try {
        const response = await this.authenticate(credentials);

        if (response && response.headers && response.headers["access-token"]) {
          this.accessToken = response.headers["access-token"];
          return this.accessToken;
        } else {
          throw new Error("Access token not found in the response headers.");
        }
      } catch (error) {
        console.error(`Authentication failed: ${error.message}`);
        return null;
      }
    } else {
      return this.accessToken;
    }
  }

  async authenticate(credentials: NewAuth): Promise<AuthResponseWithHeaders> {
    return this.request<AuthResponseWithHeaders>(`${resource}/login`, "POST", {
      data: credentials,
    });
  }
}
