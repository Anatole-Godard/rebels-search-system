import dotenv from 'dotenv';
import Hapi from '@hapi/hapi';

import {login} from './utils/login.utils.js';
import {getTokenAndValidAccess} from './utils/token.utils.js';
import {fetchCharacter, fetchCharacters} from "./utils/swapi.utils.js";

dotenv.config();

const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: {
        "cors": {
            "origin": ["*"],
            "headers": ["Accept", "Content-Type", "Authorization"],
            "additionalHeaders": ["X-Requested-With"]
        }
    }
});

server.route({
    method: 'POST',
    path: '/login',
    handler: login,
})

server.route({
    method: 'GET',
    path: '/starwars',
    handler: async (request) => {
        const type = request.query?.type || 'people';
        const search = request.query?.search;
        return await fetchCharacters(type, search).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    },
    options: {
        pre: [
            {method: getTokenAndValidAccess}
        ]
    }
});

server.route({
    method: 'GET',
    path: '/starwars/{type}/{id}',
    handler: async (request) => {
        const id = request.params.id;
        const type = request.params.type;
        return await fetchCharacter(type, id).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
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
    handler: () => {
        return '404 Error: Page Not Found';
    }
});

const start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

start();
