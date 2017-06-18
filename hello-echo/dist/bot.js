"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var botbuilder_1 = require("botbuilder");
var settings = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};
var connector = new botbuilder_1.ChatConnector(settings);
exports.connector = connector;
var bot = new botbuilder_1.UniversalBot(connector, function (session) {
    session.send("You said \"" + session.message.text + "\"").endDialog();
});
