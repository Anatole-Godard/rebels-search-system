import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const genToken = (username) => ({
    mainToken: jwt.sign(
        {
            user: username,
        },
        process.env.JWT_SIGN_SECRET,
        {
            expiresIn: '1h',
        }
    ),
});

const parseAuthorization = (authorization) =>
    authorization !== null ? authorization.replace('Bearer ', '') : null;

const validAuthorization = (authorization, req, res) => {
    const token = parseAuthorization(authorization);
    if (token !== null) {
        return jwt.verify(token, process.env.JWT_SIGN_SECRET, (err) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(401).json({
                        "message": err.message,
                    });
                } else {
                    res
                        .status(403)
                        .json({
                            "message": "Wrong token",
                        });
                }
                return false;
            }
            return true;
        });
    }
    return false;
};

export const getTokenAndValidAccess = (req, res, next) => {
    const headerAuth = req.headers.authorization;
    const validation = validAuthorization(headerAuth, req, res);
    if (validation) {
        next();
    }
};
