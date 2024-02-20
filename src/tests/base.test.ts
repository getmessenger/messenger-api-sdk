import MockAdapter from "axios-mock-adapter";
import axios, { AxiosError } from "axios";
import { MessengerSDKBase } from "../core/base";
import { AuthProps } from "../core/interfaces/auth.interface";
import { expect, describe, afterEach, it } from "@jest/globals";

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // This line will terminate the Jest process
});

const mockAxios = new MockAdapter(axios);

const authData: AuthProps = {
  username: "testUser",
  password: "testPassword",
};

describe("MessengerSDKBase", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should successfully login and get access token", async () => {
    const publicKey = "your_public_key";
    const privateKey = "your_private_key";
    const environment = "development";
    const messengerSDK = new MessengerSDKBase(
      publicKey,
      privateKey,
      environment
    );

    // Mock the login API endpoint
    const mockResponse = { success: true, message: "Login successful" };
    const mockAccessToken = "mockAccessToken";
    mockAxios.onPost("/auth/login").reply(200, mockResponse, {
      access_token: "mockAccessToken",
    });

    const authResponse = await messengerSDK.login(authData);

    // Assert the response and access token
    expect(authResponse).toEqual(mockResponse);
    expect(messengerSDK.getAccessToken()).toEqual(mockAccessToken);
  });

  it("should handle login error and return error response", async () => {
    const publicKey = "your_public_key";
    const privateKey = "your_private_key";
    const environment = "development";
    const messengerSDK = new MessengerSDKBase(
      publicKey,
      privateKey,
      environment
    );

    // Mock the login API endpoint with an error
    const errorMessage = "Invalid credentials";
    mockAxios.onPost("/auth/login").reply(401, { message: errorMessage });

    const authResponse = await messengerSDK.login(authData);

    // Assert the error message and that access token is still null
    expect(authResponse).toEqual({ message: errorMessage });
    expect(messengerSDK.getAccessToken()).toBeNull();
  });

  it("should handle API request error and attempt reauthentication", async () => {
    const publicKey = "your_public_key";
    const privateKey = "your_private_key";
    const environment = "development";
    const messengerSDK = new MessengerSDKBase(
      publicKey,
      privateKey,
      environment
    );

    // Mock an API request that results in a 401 unauthorized error
    const errorMessage = "Unauthorized";
    mockAxios.onGet("/auth/login").reply(401, { message: errorMessage });

    // Assert the reauthentication attempt
    await expect(
      messengerSDK.makeApiRequest({
        method: "get",
        url: "/auth/login",
      })
    ).rejects.toThrowError(AxiosError);
  });
});
