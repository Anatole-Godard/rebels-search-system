import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Boom from 'boom';

dotenv.config()

export const genToken = (username) => (jwt.sign(
        {
            user: username,
        },
        process.env.JWT_SIGN_SECRET,
        {
            expiresIn: '1h',
        }
    )
);

const parseAuthorization = (authorization) =>
    authorization !== null ? authorization.replace('Bearer ', '') : null;

const validAuthorization = (authorization) => {
    const token = parseAuthorization(authorization);
    if (token !== null) {
        return jwt.verify(token, process.env.JWT_SIGN_SECRET, (err) => {
            if (err) {
                throw Boom.unauthorized();
            }
            return true;
        });
    }
    return false;
};

export const getTokenAndValidAccess = (request, h) => {
    const headerAuth = request.headers.authorization;
    const validation = validAuthorization(headerAuth);
    if (validation) {
        return h.continue;
    }
};
