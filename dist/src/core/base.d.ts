import { Axios, AxiosRequestConfig } from "axios";
import { AuthProps, AuthResponseProps } from "./interfaces/auth.interface";
export declare class MessengerSDKBase {
    protected baseURL: string;
    protected publicKey: string;
    protected privateKey: string;
    protected axiosInstance: Axios;
    protected environment: string;
    private baseAuthUrl;
    protected accessToken: string | null;
    private authenticationData;
    constructor(publicKey: string, privateKey: string, environment?: string);
    private generateAndSetAccessToken;
    makeApiRequest<T>(config: AxiosRequestConfig<T>): Promise<T>;
    login(authenticationData: AuthProps): Promise<AuthResponseProps>;
    getAccessToken(): string | null;
}
