"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var botbuilder_1 = require("botbuilder");
var settings = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};
var connector = new botbuilder_1.ChatConnector(settings);
exports.connector = connector;
var bot = new botbuilder_1.UniversalBot(connector, [
    function (session) {
        botbuilder_1.Prompts.text(session, "Hello... What's your name?");
    },
    function (session, results) {
        session.userData.name = results.response;
        botbuilder_1.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?");
    },
    function (session, results) {
        session.userData.coding = results.response;
        botbuilder_1.Prompts.choice(session, "What language do you code Node using?", ['JavaScript', 'CoffeeScript', 'TypeScript']);
    },
    function (session, results) {
        session.userData.language = results.response ? results.response.entity : 'Gibberish';
        session.send("Got it... " + session.userData.name + " you've been programming for " + session.userData.coding + " years and use " + session.userData.language + ".")
            .endDialog();
    }
]);
