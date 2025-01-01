"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contentmodel = exports.Usermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect("mongodb+srv://aditya:5QoZaHnDA3Pv6ltW@cluster0.qqyta.mongodb.net/brainly");
const User = new mongoose_2.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
});
const Content = new mongoose_2.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', require: true }
});
exports.Usermodel = mongoose_1.default.model("User", User);
exports.Contentmodel = mongoose_1.default.model("Content", Content);
