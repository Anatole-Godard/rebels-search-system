import dotenv from 'dotenv'
import express from 'express'

import loginRouter from './utils/login.utils.js'
import {getTokenAndValidAccess} from './utils/token.utils.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(loginRouter)

app.use(getTokenAndValidAccess)

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})