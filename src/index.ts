import { MessengerOrder } from "./core/orders";

class MessengerClient extends MessengerOrder {
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
  }
}
export default MessengerClient;
