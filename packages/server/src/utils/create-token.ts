import User from '../interfaces/user.interface';
import TokenData from '../interfaces/token.interface';
import DataStoredInToken from '../interfaces/data-stored-in-token.interface';
import jwt from 'jsonwebtoken';

export function createToken(user: User): TokenData {
    const {JWT_SECRET, SESSION_DURATION} = process.env;
    const expiresIn = 60 * 60 * Number(SESSION_DURATION);
    const dataStoredInToken: DataStoredInToken = {
        _id: user._id,
    };
    return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, JWT_SECRET, {expiresIn}),
    };
}
