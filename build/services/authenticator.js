"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authenticator = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        var secret = process.env.JWT_SECRET;
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (err) {
        res.status(401);
        res.send('Authentication failed' + err);
    }
};
exports.default = authenticator;
