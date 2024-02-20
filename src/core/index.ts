import { MessengerSDKBase } from "./base";

export class CreateMessengerClient extends MessengerSDKBase {
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
  }
}
