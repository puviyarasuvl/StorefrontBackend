import { User, UserModel } from '../../models/user';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

const secret = process.env.JWT_SECRET as string;

const newUser: User = {
    id: 'testUser',
    firstName: 'Test',
    lastName: 'User',
    password: 'testpassword123',
    role: 'admin',
};

describe('Testing User Model', () => {
    describe('create method', () => {
        it('should add user to database and return auth token', async () => {
            const result = await userModel.create(newUser);

            jwt.verify(result, secret);
        });

        it('should throw exception while add duplicate user', async () => {
            let error;

            expect(error).toBeUndefined();

            try {
                await userModel.create(newUser);
            } catch (err) {
                error = err;
            }

            expect(error).not.toBeUndefined();
        });
    });

    describe('index method', () => {
        it('should return all available users', async () => {
            const result = await userModel.index();
            expect(result.length).toEqual(1);
            expect(result[0].id).toEqual(newUser.id);
        });
    });

    describe('show method', () => {
        it('should return details of the given user', async () => {
            const result = await userModel.show('testUser');

            expect(result.id).toEqual(newUser.id);
        });
    });

    describe('authenticate method', () => {
        it('should authenticate the user and return auth token', async () => {
            const result = await userModel.authenticate(
                'testUser',
                'testpassword123'
            );

            jwt.verify(result, secret);
        });

        it('should throw error for wrong user credentials', async () => {
            let error;

            try {
                await userModel.authenticate('testUser', 'testpassword');
            } catch (err) {
                error = err;
            }

            expect(error).toEqual(new Error('User authentication failed'));
        });

        it('should throw error if user not found', async () => {
            let error;

            try {
                await userModel.authenticate('testUser1', 'testpassword');
            } catch (err) {
                error = err;
            }

            expect(error).toEqual(new Error('No user found'));
        });
    });
});
