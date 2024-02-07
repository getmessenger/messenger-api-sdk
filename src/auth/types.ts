export declare type AuthResponse = {
  message: string;
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
  };
};

export declare type NewAuth = {
  username: string;
  password: string;
};

export interface AuthResponseWithHeaders extends AuthResponse {
  headers: {
    "access-token": string;
  };
}
