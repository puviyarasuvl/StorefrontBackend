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
exports.CustomerDashboard = void 0;
var database_1 = __importDefault(require("../database"));
/* Class to represent dashboard methods related to customer */
var CustomerDashboard = /** @class */ (function () {
    function CustomerDashboard() {
    }
    /* method : currentOrder. Returns the current open order for the customer
       input params : user id
       return : Promise<OrderDetails> */
    CustomerDashboard.prototype.currentOrder = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, currentOrder, i, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = 'SELECT userId, orderId, status, productId, quantity, createdDate FROM orders INNER JOIN order_products on orders.id=order_products.orderid WHERE userId=$1 AND status=$2';
                        return [4 /*yield*/, conn.query(sql, [userId, 'Open'])];
                    case 3:
                        result = _a.sent();
                        if (result.rows.length) {
                            currentOrder = {
                                userId: result.rows[0].userid,
                                orderId: result.rows[0].orderid,
                                orderStatus: result.rows[0].status,
                                createdDate: result.rows[0].createddate,
                                products: [
                                    {
                                        productId: result.rows[0].productid,
                                        quantity: result.rows[0].quantity,
                                    },
                                ],
                            };
                            for (i = 1; i < result.rows.length; i++) {
                                currentOrder.products.push({
                                    productId: result.rows[i].productid,
                                    quantity: result.rows[i].quantity,
                                });
                            }
                            conn.release();
                            return [2 /*return*/, currentOrder];
                        }
                        else {
                            throw new Error('No open order found for the user');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        // Incase of any error occured relese client before handling the exception
                        conn.release();
                        console.log('Failed to get the open order for the user', err_1);
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /* method : completedOrders. Returns the completed orders for the customer
       input params : user id
       return : Promise<OrderDetails[]> */
    CustomerDashboard.prototype.completedOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, order, completedOrders, added, i, j, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        sql = 'SELECT userId, orderId, status, productId, quantity, createdDate FROM orders INNER JOIN order_products on orders.id=order_products.orderid WHERE userId=$1 AND status!=$2';
                        return [4 /*yield*/, conn.query(sql, [userId, 'Open'])];
                    case 3:
                        result = _a.sent();
                        if (result.rows.length) {
                            order = {
                                orderId: result.rows[0].orderid,
                                orderStatus: result.rows[0].status,
                                createdDate: result.rows[0].createddate,
                                products: [
                                    {
                                        productId: result.rows[0].productid,
                                        quantity: result.rows[0].quantity,
                                    },
                                ],
                            };
                            completedOrders = {
                                userId: result.rows[0].userid,
                                orders: [order],
                            };
                            added = true;
                            for (i = 1; i < result.rows.length; i++) {
                                added = false;
                                for (j = 0; j < completedOrders.orders.length; j++) {
                                    if (completedOrders.orders[j].orderId ===
                                        result.rows[i].orderid) {
                                        completedOrders.orders[j].products.push({
                                            productId: result.rows[i].productid,
                                            quantity: result.rows[i].quantity,
                                        });
                                        added = true;
                                    }
                                }
                                if (!added) {
                                    completedOrders.orders.push({
                                        orderId: result.rows[i].orderid,
                                        orderStatus: result.rows[i].status,
                                        createdDate: result.rows[i].createddate,
                                        products: [
                                            {
                                                productId: result.rows[i].productid,
                                                quantity: result.rows[i].quantity,
                                            },
                                        ],
                                    });
                                }
                            }
                            return [2 /*return*/, completedOrders];
                        }
                        else {
                            throw new Error('No closed orders found for the user');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        // Incase of any error occured relese client before handling the exception
                        conn.release();
                        console.log('Failed to get the closed orders for the user', err_2);
                        throw err_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CustomerDashboard;
}());
exports.CustomerDashboard = CustomerDashboard;
