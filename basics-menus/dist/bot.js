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
        session.send("Hello... I'm a decision bot.")
            .beginDialog('/menu');
    },
    function (session) {
        session.send("Goodbye until next time...")
            .endConversation();
    }
]);
bot.dialog('/menu', [
    function (session) {
        botbuilder_1.Prompts.choice(session, "Choose an option:", "Flip A Coin|Roll Dice|Magic 8-Ball|Quit");
    },
    function (session, results) {
        var index = (results.response || { index: -1 }).index;
        switch (index) {
            case 0:
                session.beginDialog('/flip');
                break;
            case 1:
                session.beginDialog('/roll');
                break;
            case 2:
                session.beginDialog('/magic');
                break;
            default:
                session.endDialog();
                break;
        }
    },
    function (session) {
        session.replaceDialog('/menu');
    }
])
    .reloadAction('/menu-show', undefined, {
    matches: [/^(menu|back)/i]
});
bot.dialog('/flip', [
    function (session) {
        botbuilder_1.Prompts.choice(session, "Choose heads or tails", "heads|tails", { listStyle: botbuilder_1.ListStyle.none });
    },
    function (session, results) {
        var flip = Math.random() > 0.5 ? 'heads' : 'tails';
        var entity = (results.response || { entity: 'neither' }).entity;
        if (flip == entity) {
            session.send("It's " + flip + ". YOU WIN (party)")
                .endDialog();
        }
        else {
            session.send("Sorry... It was " + flip + ". You lost :(")
                .endDialog();
        }
    }
]);
bot.dialog('/roll', [
    function (session) {
        botbuilder_1.Prompts.number(session, "How many dice should I roll?");
    },
    function (session, results) {
        if (results.response && results.response > 0) {
            var series = "";
            for (var roll = void 0, index = 0; index < results.response; index++) {
                roll = Math.floor(Math.random() * 6) + 1;
                series += " " + roll;
            }
            session.send("I rolled: " + series)
                .endDialog();
        }
        else {
            session.send("Ummm... Ok... I rolled air.")
                .endDialog();
        }
    }
]);
bot.dialog('/magic', [
    function (session) {
        botbuilder_1.Prompts.text(session, "What is your question?");
    },
    function (session) {
        var magicAnswers = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes, definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        ];
        session.send(magicAnswers)
            .endDialog();
    }
]);
