import pool from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;
const secret = process.env.JWT_SECRET as string;

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
};

/* Class to represent the users table */
export class UserModel {
    /* method : create. Creates a new user using the given details and return auth token
       input params : User
       return : Promise<string> */
    async create(newUser: User): Promise<string> {
        // Hash the password using bcrypt
        const passwordHash = bcrypt.hashSync(
            newUser.password + pepper,
            parseInt(saltRounds)
        );

        const conn = await pool.connect();

        try {
            const sql =
                'INSERT INTO users (id, firstname, lastname, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *';

            const result = await conn.query(sql, [
                newUser.id,
                newUser.firstName,
                newUser.lastName,
                passwordHash,
                newUser.role,
            ]);

            // Create and return a JWT token for the new user. Token is valid for 1 hour
            const createdUser = result.rows[0];
            const token = jwt.sign(
                {
                    userId: createdUser.id,
                    fName: createdUser.firstName,
                    lName: createdUser.lastName,
                    role: createdUser.role,
                },
                secret,
                { expiresIn: '1h' }
            );

            conn.release();

            return token;
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to create new user.', err);

            throw err;
        }
    }

    /* method : index. Returns all the users information.
       input params :
       return : Promise<User []> */
    async index(): Promise<User[]> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to query all users.', err);

            throw err;
        }
    }

    /* method : show. Returns the requested user's details
       input params : user id
       return : Promise<User> */
    async show(userId: string): Promise<User> {
        const conn = await pool.connect();

        try {
            const sql = 'SELECT * FROM users WHERE id=$1';
            const result = await conn.query(sql, [userId]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to query user details.', err);

            throw err;
        }
    }

    /* method : authenticate. Authenticates provided user and returns JWT token on succesful authentication
       input params : User
       return : Promise<string> */
    async authenticate(userId: string, password: string): Promise<string> {
        const conn = await pool.connect();
        try {
            const sql = 'SELECT * FROM users WHERE id=$1';
            const result = await conn.query(sql, [userId]);

            if (result.rows.length) {
                const selectedUser = result.rows[0];

                if (
                    bcrypt.compareSync(password + pepper, selectedUser.password)
                ) {
                    // Create and return a JWT token. Token is valid for 1 hour
                    const token = jwt.sign(
                        {
                            userId: selectedUser.id,
                            fName: selectedUser.firstName,
                            lName: selectedUser.lastName,
                            role: selectedUser.role,
                        },
                        secret,
                        { expiresIn: '1h' }
                    );
                    conn.release();
                    return token;
                } else {
                    throw new Error('User authentication failed');
                }
            } else {
                throw new Error('No user found');
            }
        } catch (err) {
            // Incase of any error occured relese client before handling the exception
            conn.release();

            console.log('Failed to authenticate user.', err);

            throw err;
        }
    }
}
