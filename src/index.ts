import { MessengerOrder } from "./core/orders";

class MessengerClient extends MessengerOrder {
  constructor(publicKey: string, privateKey: string) {
    super(publicKey, privateKey);
  }
}
export default MessengerClient;
