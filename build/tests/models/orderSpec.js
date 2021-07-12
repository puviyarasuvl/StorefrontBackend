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
var order_1 = require("../../models/order");
var orderModel = new order_1.OrderModel();
var date = new Date().toLocaleString();
var order = {
    id: 1,
    userid: 'testUser2',
    status: 'Open',
    createddate: date,
};
describe('Testing Order Model', function () {
    describe('create method', function () {
        it('should create a new order for the given user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order.createddate = new Date().toLocaleString();
                        return [4 /*yield*/, orderModel.create('testUser2')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(order);
                        return [4 /*yield*/, orderModel.create('testUser3')];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error if trying to create another open order(cart) for same user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(error).toBeUndefined();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderModel.create('testUser2')];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        error = err_1;
                        return [3 /*break*/, 4];
                    case 4:
                        expect(error).toEqual(new Error('Cannot create two open orders(cart) for single user'));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('index method', function () {
        it('should return all the orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order.createddate = new Date().toLocaleString();
                        return [4 /*yield*/, orderModel.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(2);
                        expect(result[0]).toEqual(order);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('show method', function () {
        it('should return order details based on given order id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order.createddate = new Date().toLocaleString();
                        return [4 /*yield*/, orderModel.show(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(order);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('update method', function () {
        it('should update the order status to provided status', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.update(1, 'Placed')];
                    case 1:
                        result = _a.sent();
                        expect(result.status).toEqual('Placed');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe('Testing Order Products', function () {
    describe('addProduct method', function () {
        it('should throw error while adding products, if order is not open', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(error).toBeUndefined();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderModel.addProduct(1, 1, 20)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        error = err_2;
                        return [3 /*break*/, 4];
                    case 4:
                        expect(error).toEqual(new Error('Order not found or order is not open'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should add the product successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.addProduct(2, 3, 2)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: 1,
                            orderid: 2,
                            productid: 3,
                            quantity: 2,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
