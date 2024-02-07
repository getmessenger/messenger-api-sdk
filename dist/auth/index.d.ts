import { Base } from "../base";
import { NewAuth, AuthResponseWithHeaders } from "./types";
export declare class Auth extends Base {
    private readonly publicKey;
    private readonly privateKey;
    private accessToken;
    constructor(publicKey: string, privateKey: string);
    generateBearerToken(): Promise<string | null>;
    authenticate(credentials: NewAuth): Promise<AuthResponseWithHeaders>;
}
