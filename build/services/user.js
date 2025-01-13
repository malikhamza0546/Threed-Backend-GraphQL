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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.JWT_SECRET = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../lib/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = "$uperM@n@123";
class UserService {
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, email, password, lastName } = payload;
            // Generate salt and hash the password
            const salt = (0, crypto_1.randomBytes)(32).toString('hex');
            const hashedPassword = UserService.generateHash(salt, password);
            // Store data in the database
            return db_1.prismaClient.user.create({
                data: {
                    firstName,
                    email,
                    password: hashedPassword, // Correct field
                    salt, // Store the salt as well
                    lastName
                }
            });
        });
    }
    static generateHash(salt, password) {
        const hashedPassword = (0, crypto_1.createHmac)("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    static getUserByEmail(email) {
        return db_1.prismaClient.user.findUnique({ where: { email } });
    }
    static getUserById(id) {
        return db_1.prismaClient.user.findUnique({ where: { id } });
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.getUserByEmail(email);
            if (!user)
                throw new Error("user not found");
            const userSalt = user.salt;
            const userHashPassword = UserService.generateHash(userSalt, password);
            if (userHashPassword !== user.password) {
                throw new Error("Incorrect Password");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, exports.JWT_SECRET);
            return token;
        });
    }
    static decodeJWT(token) {
        return jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
    }
}
exports.UserService = UserService;
