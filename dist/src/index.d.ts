import { MessengerSDKBase } from "./core/base";
import { MessengerWallet } from "./core/wallet";
import { MessengerOrder } from "./core/orders";
declare class Typicode extends MessengerSDKBase {
}
interface Typicode extends MessengerWallet, MessengerOrder {
}
export default Typicode;
