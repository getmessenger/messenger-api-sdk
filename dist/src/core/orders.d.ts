import { MessengerSDKBase } from "./base";
import { AddressCoordinateResponse, CancelOrderResponse, ConfirmOrderResponse, DisputeOrderResponse, OrderAnalyticsResponse, OrderEstimateResponse, OrderListResponse, SingleOrderResponse } from "./interfaces/orders.interface";
export declare abstract class MessengerOrder extends MessengerSDKBase {
    private baseOrderUrl;
    constructor(publicKey: string, privateKey: string, environment: "production" | "development");
    estimateOrder(orderData: any): Promise<OrderEstimateResponse>;
    getAddressCoordinates(addressData: any): Promise<AddressCoordinateResponse>;
    confirmOrder(orderData: any): Promise<ConfirmOrderResponse>;
    cancelOrder(cancelOrderData: any, orderId: number): Promise<CancelOrderResponse>;
    disputeOrder(disputeOrderData: any, orderId: number): Promise<DisputeOrderResponse>;
    fetchOrders(): Promise<OrderListResponse>;
    fetchOrderById(orderId: number): Promise<SingleOrderResponse>;
    fetchOrdersAnalytics(): Promise<OrderAnalyticsResponse>;
}
