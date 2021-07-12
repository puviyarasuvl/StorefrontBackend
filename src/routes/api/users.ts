import express from 'express';
import { User, UserModel } from '../../models/user';
import authenticator from '../../services/authenticator';
import roleValidator from '../../services/roleValidator';

const userRouter = express.Router();

const userModel = new UserModel();

const create = async (req: express.Request, res: express.Response) => {
    let userRole = 'customer';
    if (req.body.role === 'admin') {
        userRole = 'admin';
    }
    const newUser: User = {
        id: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        role: userRole,
    };

    try {
        const result = await userModel.create(newUser);
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const result = await userModel.index();
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const result = await userModel.show(req.params.userId);
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const authenticate = async (req: express.Request, res: express.Response) => {
    try {
        const result = await userModel.authenticate(
            req.body.userId,
            req.body.password
        );
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

userRouter.post('/', (req, res) => {
    create(req, res);
});

userRouter.get('/', roleValidator, authenticator, (req, res) => {
    index(req, res);
});

userRouter.get('/:userId', roleValidator, authenticator, (req, res) => {
    show(req, res);
});

userRouter.post('/login', (req, res) => {
    authenticate(req, res);
});

export default userRouter;
