"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const auth_1 = require("./auth");
const utils_1 = require("./utils");
class Typicode extends base_1.Base {
}
(0, utils_1.applyMixins)(Typicode, [auth_1.Auth]);
exports.default = Typicode;
