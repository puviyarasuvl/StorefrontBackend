"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var customerDashboard_1 = __importDefault(require("./api/customerDashboard"));
var orders_1 = __importDefault(require("./api/orders"));
var products_1 = __importDefault(require("./api/products"));
var users_1 = __importDefault(require("./api/users"));
var routes = express_1.default.Router();
routes.get('/', function (_req, res) {
    res.send('Server is up. API is ready for use. Please access the correct endpoints.');
});
routes.use('/users', users_1.default);
routes.use('/products', products_1.default);
routes.use('/orders', orders_1.default);
routes.use('/dashboard', customerDashboard_1.default);
exports.default = routes;
