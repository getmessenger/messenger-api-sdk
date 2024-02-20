import { MessengerSDKBase } from "./base";
import {
  AddressCoordinateResponse,
  CancelOrderData,
  CancelOrderResponse,
  ConfirmOrderResponse,
  DisputeOrderData,
  DisputeOrderResponse,
  OrderEstimateResponse,
  OrderListResponse,
  SingleOrderResponse,
} from "./interfaces/orders.interface";

export default abstract class MessengerWallet extends MessengerSDKBase {
  private baseOrderUrl: string;

  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.baseOrderUrl = "/orders";
  }

  public async estimateOrder(orderData: any): Promise<OrderEstimateResponse> {
    return this.makeApiRequest<OrderEstimateResponse>({
      method: "post",
      url: `${this.baseOrderUrl}/estimate`,
      data: orderData,
    });
  }

  public async getAddressCoordinates(
    addressData: any
  ): Promise<AddressCoordinateResponse> {
    return this.makeApiRequest<AddressCoordinateResponse>({
      method: "post",
      url: `${this.baseOrderUrl}/get-address-coordinates`,
      data: addressData,
    });
  }

  public async confirmOrder(orderData: any): Promise<ConfirmOrderResponse> {
    return this.makeApiRequest<ConfirmOrderResponse>({
      method: "post",
      url: `${this.baseOrderUrl}/confirm`,
      data: orderData,
    });
  }

  public async fetchOrders(): Promise<OrderListResponse> {
    return this.makeApiRequest<OrderListResponse>({
      method: "get",
      url: `${this.baseOrderUrl}`,
    });
  }

  public async fetchOrderById(orderId: number): Promise<SingleOrderResponse> {
    return this.makeApiRequest<SingleOrderResponse>({
      method: "get",
      url: `${this.baseOrderUrl}/${orderId}`,
    });
  }
}
