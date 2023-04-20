import {genToken} from "./token.utils.js";
import dotenv from 'dotenv';
import Boom from "boom";

dotenv.config()

const usernameStored = process.env.API_USERNAME;
const passwordStored = process.env.API_PASSWORD;

export const login = (request, h) => {
    const {username, password} = request.payload;
    if (username === null || password === null) {
        return h.response({message: 'missing parameters'}).code(400);
    }

    if (username === usernameStored && password === passwordStored) {
        const token = genToken({username, password});

        return h.response({
            message: 'OK', result: {token}
        }).code(200);
    } else {
        throw Boom.unauthorized();
    }
};