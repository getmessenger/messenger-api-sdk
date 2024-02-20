import type { BaseResponse } from "./base-response";
export interface AuthProps {
    username: string;
    password: string;
}
export interface AuthResponse {
    data: {
        id: number;
        email: string | null;
        first_name: string;
        last_name: string;
        country: string;
        phone_number: string;
        type: string;
        dob: string | null;
        status: string;
        rating: number | null;
        availability: string;
        picture: string | null;
        created_on: string;
        last_seen_lat: number | null;
        last_seen_lng: number | null;
    };
}
export interface AuthResponseProps extends BaseResponse {
    data: AuthResponse;
}
