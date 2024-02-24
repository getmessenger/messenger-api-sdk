import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MessengerSDKBase } from "../core/base";
import { describe, beforeEach, afterEach, it, expect } from "@jest/globals";

describe("MessengerSDKBase", () => {
  let messengerSDK: MessengerSDKBase;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    messengerSDK = new MessengerSDKBase(
      "pk_live_UbQjMyQBV3f8uiWdwNpgQXIP0oa9EEGsskzNAGdH",
      "sk_live_V5uV9kaNLlMH4O4hKSOwTMkDo7tHAcfBynZ8TgtF",
      "production"
    );
  });

  afterEach(() => {
    mockAxios.reset();
  });

  // it("should initialize with provided credentials", () => {
  //   expect(messengerSDK.publicKey).toBe(
  //     "pk_live_UbQjMyQBV3f8uiWdwNpgQXIP0oa9EEGsskzNAGdH"
  //   );
  //   expect(messengerSDK.privateKey).toBe(
  //     "sk_live_V5uV9kaNLlMH4O4hKSOwTMkDo7tHAcfBynZ8TgtF"
  //   );
  //   expect(messengerSDK.environment).toBe("production");
  // });

  // it("should throw an error if initialized without credentials", () => {
  //   expect(() => {
  //     new MessengerSDKBase("", "");
  //   }).toThrowError("Public or Private keys are required!");
  // });

  it("should make an API request and handle reauthentication", async () => {
    const mockLoginResponse = {
      headers: {
        "access-token": "mockAccessToken",
      },
      data: { mock: "data" },
    };
    mockAxios.onPost("/auth/login").reply(200, mockLoginResponse);

    const mockApiResponse = { mock: "apiResponse" };
    mockAxios.onAny().replyOnce(401, { message: "Unauthorized" });
    mockAxios.onAny().replyOnce(200, mockApiResponse);

    await messengerSDK.login();

    const apiRequestResponse = await messengerSDK.makeApiRequest({
      method: "get",
      url: "/test",
    });

    expect(messengerSDK.getAccessToken()).toBe("mockAccessToken");

    expect(apiRequestResponse).toEqual(mockApiResponse);
  });
});
