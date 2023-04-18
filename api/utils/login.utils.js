import {Router} from "express";

import {genToken} from "./token.utils.js";
import dotenv from 'dotenv';

dotenv.config()

const loginRouter = Router();
const usernameStored = process.env.API_USERNAME;
const passwordStored = process.env.API_PASSWORD;
console.log(usernameStored, passwordStored)

loginRouter.post('/login', (req, res) => {
        const {username, password} = req.body;
        if (username === null || password === null) {
            res.status(400)
                .json({message: 'missing parameters'});
        }

        if (username === usernameStored && password === passwordStored) {
            const token = genToken({username, password});

            res.status(200).json({
                message: 'OK', result: {token}
            })
        } else {
            res.status(401)
                .json({message: 'Wrong credentials'});

        }
    }
)


export default loginRouter;