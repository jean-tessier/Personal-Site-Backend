import jwt from 'jsonwebtoken';
import { IUserDocument, UserRole } from '../models/User';
import loadConfig from '../utils/loadConfig';

interface IVerifiedUser {
    userId: string,
    role: string
};

const config = loadConfig();
const getUserIdFromJWT = (fullToken: string) => {
    if (!!fullToken)
    {
        const token = fullToken.replace('Bearer ', '');
        const verification = jwt.verify(token, config.jwt.secret) as IVerifiedUser;

        if (!verification || !verification.userId)
        {
            return null;
        }

        return verification.userId;
    }

    return null;
}

const getUserRoleFromJWT = (fullToken: string) => {
    if (!!fullToken)
    {
        const token = fullToken.replace('Bearer ', '');
        const verification = jwt.verify(token, config.jwt.secret) as IVerifiedUser;

        if (!verification || !verification.role)
        {
            return null;
        }

        return verification.role;
    }

    return null;
}

const isAuthorized = (user: IUserDocument, authorizedRoles: UserRole[]) => {
    return authorizedRoles.includes(user.role);
};

export {
    getUserIdFromJWT,
    getUserRoleFromJWT,
    isAuthorized,
};