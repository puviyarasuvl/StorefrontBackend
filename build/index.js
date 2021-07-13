"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var port = 3000;
// Enable cors for all origins and routes
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("Server started successfully at " + port);
});
exports.default = app;
