"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes = express_1.default.Router();
routes.get('/', function (_req, res) {
    res.send('Server is up. API is ready for use. Please access the correct endpoints.');
});
exports.default = routes;
