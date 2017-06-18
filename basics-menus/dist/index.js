"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv-extended");
var restify = require("restify");
var bot_1 = require("./bot");
dotenv.load();
var server = restify.createServer();
server.post('api/messages', bot_1.connector.listen());
server.listen(process.env.PORT, function () {
    console.log(server.name + " listening to " + server.url);
});
