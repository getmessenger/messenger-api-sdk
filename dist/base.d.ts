import { AxiosRequestConfig } from "axios";
type Config = {
    apiKey: string;
    baseUrl?: string;
};
export declare abstract class Base {
    private apiKey;
    private baseUrl;
    constructor(config: Config);
    protected request<T>(endpoint: string, method: string, data?: any, options?: AxiosRequestConfig): Promise<T>;
}
export {};
