import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type Config = {
  apiKey: string;
  baseUrl?: string;
};

export abstract class Base {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: Config) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api-prod.getmessenger.ng"; // TODO: 1. take this out to a central file. 2. toggle staging/prod
  }

  // Create a method called "request" to interact with endpoints using Axios
  protected request<T>(
    endpoint: string,
    method: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "api-key": this.apiKey,
    };

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      ...options,
      data: data ? JSON.stringify(data) : undefined,
    };

    return axios(config)
      .then((response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
          return response.data as T;
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error: AxiosError) => {
        // TODO: create an interceptor here
        // if we get a 401 error 'unauthorized' error, 
        // try to authenticate
        // if successful, store token and retry initial api call. 
        if (error.response) {
          throw new Error(
            `Status: ${error.response.status}, ${error.response.statusText}`
          );
        } else if (error.request) {
          throw new Error("No response received.");
        } else {
          throw new Error("Check your network connection and try again.");
        }
      });
  }
}
