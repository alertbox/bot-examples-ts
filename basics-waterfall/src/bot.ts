import {
    IChatConnectorSettings,
    IDialogResult,
    IFindMatchResult,
    Session,
    Prompts,
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
        Prompts.text(session, `Hello... What's your name?`);
    },
    (session: Session, results: IDialogResult<string>) => {
        session.userData.name = results.response;
        Prompts.number(session, `Hi ${results.response}, How many years have you been coding?`);
    },
    (session: Session, results: IDialogResult<number>) => {
        session.userData.coding = results.response;
        Prompts.choice(session, `What language do you code Node using?`, ['JavaScript', 'CoffeeScript', 'TypeScript']);
    },
    (session: Session, results: IDialogResult<IFindMatchResult>) => {
        session.userData.language = results.response ? results.response.entity : 'Gibberish';
        session.send(`Got it... ${session.userData.name} you've been programming for ${session.userData.coding} years and use ${session.userData.language}.`)
            .endDialog();
    }
]);

export {
    connector
};