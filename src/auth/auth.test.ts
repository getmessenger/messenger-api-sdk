import { Auth } from "../auth";
import { AuthResponseWithHeaders } from "./types";

jest.mock("../base");

describe("Auth SDK", () => {
  let authInstance: Auth;

  beforeEach(() => {
    jest.clearAllMocks();

    authInstance = new Auth("dynamite", "bangtanBoys");
  });

  test("generateBearerToken should obtain a bearer token", async () => {
    const authenticateMock = jest.spyOn(Auth.prototype, "authenticate");
    authenticateMock.mockResolvedValue({
      headers: { "access-token": "filmOut" },
    } as AuthResponseWithHeaders);

    const result = await authInstance.generateBearerToken();

    expect(authenticateMock).toHaveBeenCalledWith({
      username: "dynamite",
      password: "bangtanBoys",
    });

    expect(result).toBe("filmOut");
  });

  test("generateBearerToken should handle authentication failure", async () => {
    const authenticateMock = jest.spyOn(Auth.prototype, "authenticate");
    authenticateMock.mockRejectedValue(new Error("Authentication failed"));

    const result = await authInstance.generateBearerToken();

    expect(authenticateMock).toHaveBeenCalledWith({
      username: "dynamite",
      password: "bangtanBoys",
    });

    expect(result).toBeNull();
  });
});
