import { MessengerOrder } from "./core/orders";
declare class MessengerClient extends MessengerOrder {
    constructor(publicKey: string, privateKey: string);
}
export default MessengerClient;
