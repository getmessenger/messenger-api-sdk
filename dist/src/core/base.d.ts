import { AxiosRequestConfig, AxiosInstance } from "axios";
import { AuthResponseProps } from "./interfaces/auth.interface";
export declare class MessengerSDKBase {
    protected baseURL: string;
    publicKey: string;
    privateKey: string;
    protected axiosInstance: AxiosInstance;
    environment: string;
    private baseAuthUrl;
    protected accessToken: string | null;
    private authenticationData;
    constructor(publicKey: string, privateKey: string, environment?: string);
    login(): Promise<AuthResponseProps>;
    makeApiRequest<T>(config: AxiosRequestConfig<T>): Promise<T>;
    getAccessToken(): string | null;
}
