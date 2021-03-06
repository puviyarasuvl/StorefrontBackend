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
var user_1 = require("../../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userModel = new user_1.UserModel();
var secret = process.env.JWT_SECRET;
var newUser = {
    id: 'testUser',
    firstName: 'Test',
    lastName: 'User',
    password: 'testpassword123',
    role: 'admin',
};
var newUser2 = {
    id: 'testUser2',
    firstName: 'Test',
    lastName: 'User',
    password: 'testpassword123',
    role: 'customer',
};
var newUser3 = {
    id: 'testUser3',
    firstName: 'Test',
    lastName: 'User',
    password: 'testpassword123',
    role: 'customer',
};
describe('Testing User Model', function () {
    describe('create method', function () {
        it('should add user to database and return auth token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create(newUser)];
                    case 1:
                        result = _a.sent();
                        jsonwebtoken_1.default.verify(result, secret);
                        return [4 /*yield*/, userModel.create(newUser2)];
                    case 2:
                        result = _a.sent();
                        jsonwebtoken_1.default.verify(result, secret);
                        return [4 /*yield*/, userModel.create(newUser3)];
                    case 3:
                        result = _a.sent();
                        jsonwebtoken_1.default.verify(result, secret);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw exception while add duplicate user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(error).toBeUndefined();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userModel.create(newUser)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        error = err_1;
                        return [3 /*break*/, 4];
                    case 4:
                        expect(error).not.toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('index method', function () {
        it('should return all available users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(3);
                        expect(result[0].id).toEqual(newUser.id);
                        expect(result[1].id).toEqual(newUser2.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('show method', function () {
        it('should return details of the given user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.show('testUser')];
                    case 1:
                        result = _a.sent();
                        expect(result.id).toEqual(newUser.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('authenticate method', function () {
        it('should authenticate the user and return auth token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.authenticate('testUser', 'testpassword123')];
                    case 1:
                        result = _a.sent();
                        jsonwebtoken_1.default.verify(result, secret);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error for wrong user credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel.authenticate('testUser', 'testpassword')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        error = err_2;
                        return [3 /*break*/, 3];
                    case 3:
                        expect(error).toEqual(new Error('User authentication failed'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error if user not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel.authenticate('testUser1', 'testpassword')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        error = err_3;
                        return [3 /*break*/, 3];
                    case 3:
                        expect(error).toEqual(new Error('No user found'));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
