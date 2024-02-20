// // auth.test.ts
// import MockAdapter from "axios-mock-adapter";
// import MessengerAuth from "../core/auth";
// import axios, { AxiosResponse, AxiosInstance } from "axios";
// import {} from "node:test";
// import { CreateMessengerClient } from "../core";
// import { expect, describe, afterEach, it } from "@jest/globals";

// // Mocking the axiosInstance for MessengerAuth
// const mockAxios = new MockAdapter(axios as any);

// // Mock your authentication data
// const authData = {
//   username: "testUser",
//   password: "testPassword",
// };

// describe("MessengerAuth", () => {
//   afterEach(() => {
//     mockAxios.reset();
//   });

//   it("should successfully login and get access token", async () => {
//     const publicKey = "pk_live_UbQjMyQBV3f8uiWdwNpgQXIP0oa9EEGsskzNAGdH";
//     const privateKey = "sk_live_V5uV9kaNLlMH4O4hKSOwTMkDo7tHAcfBynZ8TgtF";

//     const environment = "development";
//     const messengerAuth = new MessengerAuth(publicKey, privateKey, environment);

//     // Mock the login API endpoint
//     const mockResponse = { success: true, message: "Login successful" };
//     mockAxios.onPost("/auth/login").reply(200, mockResponse, {
//       access_token: "mockAccessToken",
//     });

//     const authResponse = await messengerAuth.login(authData);

//     // Assert the response
//     expect(authResponse).toEqual(mockResponse);

//     // Assert the access token
//     expect(messengerAuth.getAccessToken()).toEqual("mockAccessToken");
//   });

//   it("should handle login error and return error response", async () => {
//     const publicKey = "pk_live_UbQjMyQBV3f8uiWdwNpgQXIP0oa9EEGsskzNAGdH";
//     const privateKey = "sk_live_V5uV9kaNLlMH4O4hKSOwTMkDo7tHAcfBynZ8TgtF";
//     const environment = "development";
//     const messengerAuth = new MessengerAuth(publicKey, privateKey, environment);

//     // Mock the login API endpoint with an error
//     const errorMessage = "Invalid credentials";
//     mockAxios.onPost("/auth/login").reply(401, { message: errorMessage });

//     const authResponse = await messengerAuth.login(authData);

//     // Assert the error message
//     expect(authResponse).toEqual({ message: errorMessage });

//     // Assert that access token is still null
//     expect(messengerAuth.getAccessToken()).toBeNull();
//   });
// });
