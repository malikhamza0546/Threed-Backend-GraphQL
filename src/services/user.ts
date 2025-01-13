import { randomBytes, createHmac } from "crypto";
import { prismaClient } from "../lib/db";
import jwt from "jsonwebtoken";
export const JWT_SECRET = "$uperM@n@123";
export interface CreateUserPayload {
    firstName: string;
    email: string;
    password: string;
    lastName: string;
}

export interface getUserTokenPayload {
    email: string;
    password: string;
}

export class UserService {
    public static async createUser(payload: CreateUserPayload) {
        const { firstName, email, password, lastName } = payload;



        // Generate salt and hash the password
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = UserService.generateHash(salt, password)

        // Store data in the database
        return prismaClient.user.create({
            data: {
                firstName,
                email,
                password: hashedPassword, // Correct field
                salt,                    // Store the salt as well
                lastName
            }
        });
    }

    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } })
    }

    public static getUserById(id: string) {
        return prismaClient.user.findUnique({ where: { id } })
    }


    public static async getUserToken(payload: getUserTokenPayload) {
        const { email, password } = payload;

        const user = await UserService.getUserByEmail(email);
        if (!user) throw new Error("user not found");
        const userSalt = user.salt;
        const userHashPassword = UserService.generateHash(userSalt, password);
        if (userHashPassword !== user.password) {
            throw new Error("Incorrect Password")
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;

    }

    public static decodeJWT(token: string) {
        return jwt.verify(token, JWT_SECRET)
    }
}
