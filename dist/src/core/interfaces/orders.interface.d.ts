import { BaseResponse } from "./base-response";
export interface Rider {
    id: number;
    first_name: string;
    last_name: string;
}
export interface OrderEstimate {
    arrival_eta: number;
    token: string;
    base_cost: number;
    delivery_cost: number;
    surge_multiple: number;
    surge_reason: string;
    riders: Rider[];
}
export interface OrderEstimateData {
    locations: Location[];
}
export interface OrderEstimateResponse extends BaseResponse {
    data: OrderEstimate;
}
export interface AddressCoordinate {
    formatted_address: string;
    location: {
        lat: number;
        lng: number;
    };
    place_id: string;
}
export interface AddressCoordinateResponse extends BaseResponse {
    data: AddressCoordinate[];
}
export interface Location {
    label: string;
    address: string;
    type: string;
    latitude: number;
    longitude: number;
    note: string;
    contact_name: string;
    contact_phone: string;
    contact_alternate_phone: string | null;
}
export interface ConfirmedOrder {
    id: number;
    reference: string;
    customer_id: number;
    rider_id: number | null;
    amount: number;
    status: string;
    payment_method: string;
    scheduled_for: string | null;
    customer: Customer | null;
    rider: any;
    rating: any;
    locations: Location[];
    timelines: Timeline[];
    created_on: string;
}
export interface Timeline {
    status: string;
    title: string;
    description: string;
    created_on: string;
}
export interface ConfirmOrderResponse extends BaseResponse {
    data: ConfirmedOrder;
}
export interface CancelOrderResponse extends BaseResponse {
    data: ConfirmedOrder;
}
export interface DisputedOrder {
    id: number;
    reference: string;
    customer_id: number;
    rider_id: number | null;
    amount: number;
    distance_fare: number;
    base_amount: number;
    status: string;
    payment_method: string;
    scheduled_for: string | null;
    customer: Customer | null;
    rider: any;
    rating: any;
    locations: Location[];
    timelines: Timeline[];
    premium_order: boolean;
    created_on: string;
}
export interface DisputeOrderData {
    message: string;
    data: DisputedOrder;
    comment: string;
}
export interface DisputeOrderResponse extends BaseResponse {
    data: DisputedOrder;
}
export interface Order {
    id: number;
    reference: string;
    customer_id: number;
    rider_id: number | null;
    amount: number;
    distance_fare: number;
    base_amount: number;
    status: string;
    payment_method: string;
    scheduled_for: string | null;
    customer: Customer | null;
    rider: any | null;
    rating: any | null;
    locations: Location[];
    premium_order: boolean;
    created_on: string;
}
export interface OrderListResponse extends BaseResponse {
    data: Order[];
    meta: {
        limit: number;
        total: number;
        page: number;
        pages: number;
    };
}
export interface SingleOrderResponse extends BaseResponse {
    data: Order;
}
export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    picture?: string | null;
}
export interface OrderAnalytics {
    status: string;
    count: number;
    sum: number;
}
export interface OrderAnalyticsResponse extends BaseResponse {
    data: OrderAnalytics[];
    meta: {
        total: {
            count: number;
            sum: number;
        };
    };
}
