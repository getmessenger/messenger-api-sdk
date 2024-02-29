import { MessengerOrder } from "./core/orders";
declare class MessengerClient extends MessengerOrder {
    constructor(publicKey: string, privateKey: string, environment: "production" | "development");
}
export default MessengerClient;
