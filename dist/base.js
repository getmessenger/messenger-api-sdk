"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const axios_1 = require("axios");
class Base {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || "https://api-prod.getmessenger.ng";
    }
    request(endpoint, method, data, options) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            "Content-Type": "application/json",
            "api-key": this.apiKey,
        };
        const config = Object.assign(Object.assign({ method,
            url,
            headers }, options), { data: data ? JSON.stringify(data) : undefined });
        return (0, axios_1.default)(config)
            .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }
            else {
                throw new Error(response.statusText);
            }
        })
            .catch((error) => {
            if (error.response) {
                throw new Error(`Status: ${error.response.status}, ${error.response.statusText}`);
            }
            else if (error.request) {
                throw new Error("No response received.");
            }
            else {
                throw new Error("Check your network connection and try again.");
            }
        });
    }
}
exports.Base = Base;
