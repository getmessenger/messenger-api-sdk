import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ENVIRON } from "./config";
import { AuthProps, AuthResponseProps } from "./interfaces/auth.interface";

export class MessengerSDKBase {
  protected baseURL: string;
  protected publicKey: string;
  protected privateKey: string;
  protected axiosInstance: Axios;
  protected environment: string = ENVIRON.PROD;
  private baseAuthUrl: string;
  protected accessToken: string | null = null;
  private authenticationData: AuthProps | null = null;

  constructor(publicKey: string, privateKey: string, environment?: string) {
    this.baseAuthUrl = "/auth";
    if (!publicKey || !privateKey)
      throw new Error("Public or Private keys are required!");
    if (!this.environment)
      console.warn("No environment specified. Defaulting to development.");

    this.baseURL =
      this.environment === "test" || this.environment === "development"
        ? ENVIRON.STAGING
        : ENVIRON.PROD;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.environment = environment || "development";

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
          this.generateAndSetAccessToken();

          // Retry the original request after reauthentication
          return axios(error.config as AxiosRequestConfig<any>);
        }

        return Promise.reject(error);
      }
    );
  }

  private async generateAndSetAccessToken(): Promise<void> {
    const newTokenResponse = await this.axiosInstance.post(
      `${this.baseAuthUrl}/login`,
      this.authenticationData
    );

    this.accessToken = newTokenResponse.headers["access_token"];
  }

  public async makeApiRequest<T>(config: AxiosRequestConfig<T>): Promise<T> {
    try {
      if (!this.accessToken) {
        throw new Error("Access token is missing or invalid.");
      }

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.accessToken}`,
      };

      const response = await axios(config);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 401) {
          await this.getAccessToken();

          // This should retry the original request after reauthentication
          return this.makeApiRequest<T>(config);
        }

        console.error("API request failed:", axiosError?.response?.data);
        throw axiosError;
      }

      console.error("Unknown error:", error);
      throw error;
    }
  }

  public async login(
    authenticationData: AuthProps
  ): Promise<AuthResponseProps> {
    if (!authenticationData || typeof authenticationData !== "object")
      throw new Error("Invalid authentication data!");
    if (!this.publicKey || !this.privateKey)
      throw new Error("Public or Private keys are required!");
    if (!this.environment)
      console.warn("No environment specified. Defaulting to development.");

    const dataToSend = {
      username: authenticationData.username,
      password: authenticationData.password,
    };

    try {
      const MessengerResponse = await this.axiosInstance.post(
        `${this.baseAuthUrl}/login`,
        dataToSend
      );

      this.accessToken = MessengerResponse.headers["access_token"];

      return MessengerResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  public getAccessToken(): string | null {
    if (this.accessToken) {
      return this.accessToken;
    }

    return null;
  }
}
