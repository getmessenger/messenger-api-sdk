// import { MessengerSDKBase } from "./base";
// import { AuthProps, AuthResponseProps } from "./interfaces/auth.interface";

// export default class MessengerAuth extends MessengerSDKBase {
//   private baseAuthUrl: string;
//   protected accessToken: string | null = null;
//   constructor(
//     publicKey: string,
//     privateKey: string,
//     environment: "production" | "development"
//   ) {
//     super(publicKey, privateKey, environment);
//     this.baseAuthUrl = "/auth";
//   }

//   public async login(
//     authenticationData: AuthProps
//   ): Promise<AuthResponseProps> {
//     if (!authenticationData || typeof authenticationData !== "object")
//       throw new Error("Invalid authentication data!");
//     if (!this.publicKey || !this.privateKey)
//       throw new Error("Public or Private keys are required!");
//     if (!this.environment)
//       console.warn("No environment specified. Defaulting to development.");

//     const dataToSend = {
//       username: authenticationData.username,
//       password: authenticationData.password,
//     };

//     try {
//       const MessengerResponse = await this.axiosInstance.post(
//         `${this.baseAuthUrl}/login`,
//         dataToSend
//       );

//       this.accessToken = MessengerResponse.headers["access_token"];

//       return MessengerResponse.data;
//     } catch (error: any) {
//       console.warn(error?.response?.data?.message);
//       return error.response.data;
//     }
//   }

//   // Add this method to get the access token
//   public getAccessToken(): string | null {
//     return this.accessToken;
//   }
// }
