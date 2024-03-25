import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";
import { ENVIRON } from "./config";
import { AuthProps, AuthResponseProps } from "./interfaces/auth.interface";
export class MessengerSDKBase {
  protected baseURL: string;
  public publicKey: string;
  public privateKey: string;
  protected axiosInstance: AxiosInstance;
  public environment: string;
  private baseAuthUrl: string;
  protected accessToken: string | null = null;
  private authenticationData: AuthProps | null = null;

  constructor(publicKey: string, privateKey: string) {
    this.baseAuthUrl = "/auth";
    if (!publicKey || !privateKey) {
      throw new Error("Public or Private keys are required!");
    }

    // Determine environment based on keys
    if (
      publicKey.toLowerCase().includes("live") ||
      privateKey.toLowerCase().includes("live")
    ) {
      this.environment = ENVIRON.PROD; // Live environment
    } else {
      this.environment = ENVIRON.STAGING; // Staging environment
    }

    this.baseURL =
      this.environment === ENVIRON.PROD ? ENVIRON.PROD : ENVIRON.STAGING;
    this.publicKey = publicKey;
    this.privateKey = privateKey;

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          this.login();

          return axios(error.config as AxiosRequestConfig<any>);
        }

        return Promise.reject(error);
      }
    );
  }

  public async login(): Promise<AuthResponseProps> {
    if (!this.publicKey || !this.privateKey)
      throw new Error("Public or Private keys are required!");
    if (!this.environment)
      console.warn("No environment specified. Defaulting to development.");

    const credentialsString = `${this.publicKey}:${this.privateKey}`;
    const base64Credentials = Buffer.from(credentialsString).toString("base64");

    try {
      const MessengerResponse = await this.axiosInstance.post(
        `${this.baseAuthUrl}/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
          auth: {
            username: this.publicKey,
            password: this.privateKey,
          },
        }
      );

      // let mockAccessToken = "mockAccessToken";
      this.accessToken = MessengerResponse.headers["access-token"];
      // await this.generateAndSetAccessToken();

      return MessengerResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  public async makeApiRequest<T>(config: AxiosRequestConfig<T>): Promise<T> {
    try {
      if (!this.accessToken) {
        const loginResponse = await this.login();

        if (!loginResponse || !this.accessToken) {
          throw new Error("Failed to obtain access token.");
        }
      }

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.accessToken}`,
      };

      const response = await this.axiosInstance(config);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 401) {
          console.error("Received 401. Attempting to refresh access token...");

          await this.login();

          console.log(
            "Access token successfully refreshed. Retrying the request."
          );

          return this.makeApiRequest<T>(config);
        }

        console.error("API request failed:", axiosError?.response?.data);
        throw axiosError;
      }

      console.error("Unknown error:", error);
      throw error;
    }
  }

  public getAccessToken(): string | null {
    if (this.accessToken) {
      return this.accessToken;
    }
    return null;
  }
}
