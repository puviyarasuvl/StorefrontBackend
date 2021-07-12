import express, { json } from 'express';
import jwt from 'jsonwebtoken';

const userIdGetter = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    try {
        const authorizationHeader = req.headers.authorization as String;
        const token = authorizationHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET as string;
        const decodedToken = jwt.decode(token, { json: true });

        res.locals.userId = decodedToken?.userId;
        next();
    } catch (err) {
        res.status(403);
        res.send('Error :' + err);
    }
};

export default userIdGetter;
