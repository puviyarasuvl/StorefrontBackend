"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var roleValidator = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        var secret = process.env.JWT_SECRET;
        var decodedToken = jsonwebtoken_1.default.decode(token, { json: true });
        if ((decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role) === 'admin') {
            next();
        }
        else {
            throw 'Access Denied';
        }
    }
    catch (err) {
        res.status(403);
        res.send('Error :' + err);
    }
};
exports.default = roleValidator;
