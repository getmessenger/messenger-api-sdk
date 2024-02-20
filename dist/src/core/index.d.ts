import { MessengerSDKBase } from "./base";
export declare class CreateMessengerClient extends MessengerSDKBase {
    constructor(publicKey: string, privateKey: string, environment: "production" | "development");
}
