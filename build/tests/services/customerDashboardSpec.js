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
Object.defineProperty(exports, "__esModule", { value: true });
var customerDashboard_1 = require("../../services/customerDashboard");
var order_1 = require("../../models/order");
var orderModel = new order_1.OrderModel();
var customerDashboard = new customerDashboard_1.CustomerDashboard();
var expectedOrderDetails = {
    userId: 'testUser2',
    orderId: 3,
    orderStatus: 'Open',
    createdDate: '7/12/2021, 7:44:54 PM',
    products: [{ productId: 2, quantity: 1 }],
};
expectedOrderDetails.products.push({ productId: 3, quantity: 2 });
var expectedCompletedOrders = {
    userId: 'testUser2',
    orders: [
        {
            orderId: 3,
            orderStatus: 'Shipped',
            createdDate: '7/12/2021, 11:15:56 PM',
            products: [
                { productId: 2, quantity: 1 },
                { productId: 3, quantity: 2 },
            ],
        },
        {
            orderId: 4,
            orderStatus: 'Shipped',
            createdDate: '7/12/2021, 11:15:56 PM',
            products: [
                { productId: 2, quantity: 10 },
                { productId: 3, quantity: 20 },
            ],
        },
    ],
};
describe('Testing Customer Dashboard', function () {
    describe('currentOrder method', function () {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create some new orders
                        expectedOrderDetails.createdDate = new Date().toLocaleString();
                        return [4 /*yield*/, orderModel.create('testUser2')];
                    case 1:
                        result = _a.sent();
                        orderModel.addProduct(result.id, 2, 1);
                        orderModel.addProduct(result.id, 3, 2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('expect no of orders to be 3', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return open order details for the given user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customerDashboard.currentOrder('testUser2')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(expectedOrderDetails);
                        return [2 /*return*/];
                }
            });
        }); });
        it('close the order for testUser3', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.update(2, 'Shipped')];
                    case 1:
                        result = _a.sent();
                        expect(result.status).toEqual('Shipped');
                        return [2 /*return*/];
                }
            });
        }); });
        it('close the order id 3 for testUser2', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.update(3, 'Shipped')];
                    case 1:
                        result = _a.sent();
                        expect(result.status).toEqual('Shipped');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error when no open order found for the user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(error).toBeUndefined();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, customerDashboard.currentOrder('testUser3')];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        error = err_1;
                        return [3 /*break*/, 4];
                    case 4:
                        expect(error).toEqual(new Error('No open order found for the user'));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('completedOrders method', function () {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create some new orders
                        expectedCompletedOrders.orders[0].createdDate =
                            new Date().toLocaleString();
                        expectedCompletedOrders.orders[1].createdDate =
                            new Date().toLocaleString();
                        return [4 /*yield*/, orderModel.create('testUser2')];
                    case 1:
                        result = _a.sent();
                        orderModel.addProduct(result.id, 2, 10);
                        orderModel.addProduct(result.id, 3, 20);
                        return [2 /*return*/];
                }
            });
        }); });
        it('expect no of orders to be 4', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(4);
                        return [2 /*return*/];
                }
            });
        }); });
        it('close the order id 4 for testUser2', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.update(4, 'Shipped')];
                    case 1:
                        result = _a.sent();
                        expect(result.status).toEqual('Shipped');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return completed orders for the given user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customerDashboard.completedOrders('testUser2')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(expectedCompletedOrders);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error id no closed orders found for the user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(error).toBeUndefined();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, customerDashboard.completedOrders('testUser4')];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        error = err_2;
                        return [3 /*break*/, 4];
                    case 4:
                        expect(error).toEqual(new Error('No closed orders found for the user'));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
