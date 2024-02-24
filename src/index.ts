import { MessengerSDKBase } from "./core/base";
import { applyMixins } from "./utils";
import { MessengerWallet } from "./core/wallet";
import { MessengerOrder } from "./core/orders";

class Typicode extends MessengerSDKBase {}
interface Typicode extends MessengerWallet, MessengerOrder {}

export default Typicode;
