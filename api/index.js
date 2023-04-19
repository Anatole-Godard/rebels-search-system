import dotenv from 'dotenv';
import Hapi from '@hapi/hapi';
import axios from 'axios';

import {login} from './utils/login.utils.js';
import {getTokenAndValidAccess} from './utils/token.utils.js';

dotenv.config();

const server = Hapi.server({
    port: process.env.PORT || 3000,
});

server.route({
    method: 'POST',
    path: '/login',
    handler: login,
})

server.route({
    method: 'GET',
    path: '/starwars/{characterId}',
    handler: async (request, h) => {
        const apiUrl = `https://swapi.dev/api/people/${request.params.characterId}`;
        const {data} = await axios.get(apiUrl);
        return data;
    },
    options: {
        pre: [
            {method: getTokenAndValidAccess}
        ]
    }
});

server.route({
    method: '*',
    path: '/{any*}',
    options: {
        auth: false,
    },
    handler: (request, h) => {
        return '404 Error: Page Not Found';
    }
});

const start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

start();
