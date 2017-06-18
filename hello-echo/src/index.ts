import * as dotenv from 'dotenv-extended';
import * as restify from 'restify';
import {
    connector
} from './bot';

dotenv.load();

const server = restify.createServer();

server.post('api/messages', connector.listen());

server.listen(process.env.PORT, () => {
    console.log(`${server.name} listening to ${server.url}`);
});