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
    customer: {
        id: number;
        first_name: string;
        last_name: string;
    };
    rider: any;
    rating: any;
    locations: Location[];
    timelines: any[];
    created_on: string;
}
export interface ConfirmOrderResponse extends BaseResponse {
    data: ConfirmedOrder;
}
