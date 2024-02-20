import { MessengerSDKBase } from "./base";
import { AddressCoordinateResponse, ConfirmOrderResponse, OrderEstimateResponse } from "./interfaces/orders.interface";
export default abstract class MessengerWallet extends MessengerSDKBase {
    private baseOrderUrl;
    constructor(publicKey: string, privateKey: string, environment: "production" | "development");
    estimateOrder(orderData: any): Promise<OrderEstimateResponse>;
    getAddressCoordinates(addressData: any): Promise<AddressCoordinateResponse>;
    confirmOrder(orderData: any): Promise<ConfirmOrderResponse>;
}
