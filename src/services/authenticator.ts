import express from 'express';
import jwt from 'jsonwebtoken';

const authenticator = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    try {
        const authorizationHeader = req.headers.authorization as String;
        const token = authorizationHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET as string;
        jwt.verify(token, secret);

        next();
    } catch (err) {
        res.status(401);
        res.send('Authentication failed' + err);
    }
};

export default authenticator;
