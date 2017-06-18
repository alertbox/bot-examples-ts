import {
    IChatConnectorSettings,
    IDialogResult,
    IFindMatchResult,
    Session,
    Prompts,
    ListStyle,
    ChatConnector,
    UniversalBot
} from 'botbuilder';

const settings: IChatConnectorSettings = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};

const connector = new ChatConnector(settings);

const bot = new UniversalBot(connector, [
    (session: Session) => {
        session.send(`Hello... I'm a decision bot.`)
            .beginDialog('/menu');
    },
    (session: Session) => {
        session.send(`Goodbye until next time...`)
            .endConversation();
    }
]);

bot.dialog('/menu', [
    (session: Session) => {
        Prompts.choice(session, `Choose an option:`, `Flip A Coin|Roll Dice|Magic 8-Ball|Quit`);
    },
    (session: Session, results: IDialogResult<IFindMatchResult>) => {
        const { index } = results.response || { index: -1 };
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
    (session: Session) => {
        session.replaceDialog('/menu');
    }
])
    .reloadAction('/menu-show', undefined, {
        matches: [/^(menu|back)/i]
    });

bot.dialog('/flip', [
    (session: Session) => {
        Prompts.choice(session, `Choose heads or tails`, `heads|tails`, { listStyle: ListStyle.none });
    },
    (session: Session, results: IDialogResult<IFindMatchResult>) => {
        const flip = Math.random() > 0.5 ? 'heads' : 'tails';
        const { entity } = results.response || { entity: 'neither' };
        if (flip == entity) {
            session.send(`It's ${flip}. YOU WIN (party)`)
                .endDialog();
        } else {
            session.send(`Sorry... It was ${flip}. You lost :(`)
                .endDialog();
        }
    }
]);

bot.dialog('/roll', [
    (session: Session) => {
        Prompts.number(session, `How many dice should I roll?`);
    },
    (session: Session, results: IDialogResult<number>) => {

        if (results.response && results.response > 0) {

            if (results.response > 5) {
                session.sendTyping();
            }

            let series = ``;
            for (let roll: number, index = 0; index < results.response; index++) {
                roll = Math.floor(Math.random() * 6) + 1;
                series += ` ${roll}`;
            }
            session.send(`I rolled: ${series}`)
                .endDialog();

        } else {
            session.send(`Ummm... Ok... I rolled air.`)
                .endDialog();
        }
    }
]);

bot.dialog('/magic', [
    (session: Session) => {
        Prompts.text(session, `What is your question?`);
    },
    (session: Session) => {
        const magicAnswers = [
            `It is certain`,
            `It is decidedly so`,
            `Without a doubt`,
            `Yes, definitely`,
            `You may rely on it`,
            `As I see it, yes`,
            `Most likely`,
            `Outlook good`,
            `Yes`,
            `Signs point to yes`,
            `Reply hazy try again`,
            `Ask again later`,
            `Better not tell you now`,
            `Cannot predict now`,
            `Concentrate and ask again`,
            `Don't count on it`,
            `My reply is no`,
            `My sources say no`,
            `Outlook not so good`,
            `Very doubtful`
        ];
        session.send(magicAnswers)
            .endDialog();
    }
]);

export {
    connector
};