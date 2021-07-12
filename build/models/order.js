"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var database_1 = __importDefault(require("../database"));
/* Class to represent the orders table */
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    /* method : create. Creates and returns a new order
       input params : user id
       return : Promise<Order> */
    OrderModel.prototype.create = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, status, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        status = 'Open';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = 'INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [userId, status])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_1 = _a.sent();
                        // Incase of any error occured relese client before handling the exception
                        conn.release();
                        console.log('Failed to create new order', err_1);
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /* method : index. Returns all the avilable orders
       input params :
       return : Promise<Order []> */
    OrderModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_2 = _a.sent();
                        // Incase of any error occured relese client before handling the exception
                        conn.release();
                        console.log('Failed to fetch the orders', err_2);
                        throw err_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /* method : show. Returns the order details based on the order id
       input params : order id
       return : Promise<Order> */
    OrderModel.prototype.show = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = 'SELECT * FROM orders WHERE id=$1';
                        return [4 /*yield*/, conn.query(sql, [orderId])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_3 = _a.sent();
                        // Incase of any error occured relese client before handling the exception
                        conn.release();
                        console.log('Failed to fetch the order details', err_3);
                        throw err_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /* method : update. Updates the status information in the order id
       input params : Order id, status
       return : Promise<Order> */
    OrderModel.prototype.update = function (orderId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [status, orderId])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_4 = _a.sent();
                        // Incase of any error occured relese client before handling the exception
                        conn.release();
                        console.log('Failed to update the order details', err_4);
                        throw err_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /* method : addProduct. Adds the given product details into the order
       input params : Order id, Product id, quantity
       return : Promise<OrderProducts> */
    OrderModel.prototype.addProduct = function (orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, date, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        sql = 'SELECT * FROM orders WHERE id=$1';
                        return [4 /*yield*/, conn.query(sql, [orderId])];
                    case 3:
                        result = _a.sent();
                        if (!(result.rows.length && result.rows[0].status === 'Open')) return [3 /*break*/, 5];
                        date = new Date().toLocaleString();
                        sql =
                            'INSERT INTO order_products (orderId, productId, quantity, createdDate) VALUES ($1, $2, $3, $4) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [
                                orderId,
                                productId,
                                quantity,
                                date,
                            ])];
                    case 4:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 5: throw new Error('Order not found or order is not open');
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_5 = _a.sent();
                        // Incase of any error occured relese client before handling the exception
                        conn.release();
                        console.log('Failed to add the product details into order', err_5);
                        throw err_5;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.OrderModel = OrderModel;
