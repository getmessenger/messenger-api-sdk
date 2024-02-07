"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../auth");
jest.mock("../base");
describe("Auth SDK", () => {
    let authInstance;
    beforeEach(() => {
        jest.clearAllMocks();
        authInstance = new auth_1.Auth("dummyPublicKey", "dummyPrivateKey");
    });
    test("generateBearerToken should obtain a bearer token", async () => {
        const authenticateMock = jest.spyOn(auth_1.Auth.prototype, "authenticate");
        authenticateMock.mockResolvedValue({
            headers: { "access-token": "dummyAccessToken" },
        });
        const result = await authInstance.generateBearerToken();
        expect(authenticateMock).toHaveBeenCalledWith({
            username: "dummyPublicKey",
            password: "dummyPrivateKey",
        });
        expect(result).toBe("dummyAccessToken");
    });
    test("generateBearerToken should handle authentication failure", async () => {
        const authenticateMock = jest.spyOn(auth_1.Auth.prototype, "authenticate");
        authenticateMock.mockRejectedValue(new Error("Authentication failed"));
        const result = await authInstance.generateBearerToken();
        expect(authenticateMock).toHaveBeenCalledWith({
            username: "dummyPublicKey",
            password: "dummyPrivateKey",
        });
        expect(result).toBeNull();
    });
});
