"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const base_1 = require("../base");
const resource = "auth";
class Auth extends base_1.Base {
    constructor(publicKey, privateKey) {
        super({ apiKey: "", baseUrl: "https://api-prod.getmessenger.ng" });
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
    async generateBearerToken() {
        if (!this.accessToken) {
            const credentials = {
                username: this.publicKey,
                password: this.privateKey,
            };
            try {
                const response = await this.authenticate(credentials);
                if (response && response.headers && response.headers["access-token"]) {
                    this.accessToken = response.headers["access-token"];
                    return this.accessToken;
                }
                else {
                    throw new Error("Access token not found in the response headers.");
                }
            }
            catch (error) {
                console.error(`Authentication failed: ${error.message}`);
                return null;
            }
        }
        else {
            return this.accessToken;
        }
    }
    async authenticate(credentials) {
        return this.request(`${resource}/login`, "POST", {
            data: credentials,
        });
    }
}
exports.Auth = Auth;
