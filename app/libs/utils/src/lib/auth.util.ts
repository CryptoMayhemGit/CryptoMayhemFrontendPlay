import { LOGIN_MESSAGE, REGISTER_MESSAGE } from "@crypto-mayhem-frontend/crypto-mayhem/config";
import { LoginMessage, RegisterMessage } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/models";
import { dateAsSeconds, getNow } from "./date.utils";


export const serializeMessage = (object: any): string => {
    return JSON.stringify(object, undefined, 4);
}

export const generateRegisterMessage = (): string => {
    const now = getNow();

    return serializeMessage({
        message: `${REGISTER_MESSAGE} ${now.toLocaleString()}.`,
        nonce: dateAsSeconds(now)
    });
}

export const generateLoginMessage = (): string => {
    const now = getNow();

    return serializeMessage({
        message: `${LOGIN_MESSAGE} ${now.toLocaleString()}.`,
        nonce: dateAsSeconds(now)
    });
}

export const generateRegisterMessageDeprecated = (): RegisterMessage => {
    const now = getNow();

    return {
        message: `${REGISTER_MESSAGE} ${now.toLocaleString()}.`,
        nonce: dateAsSeconds(now)
    };
}

export const generateLoginMessageDeprecated = (): LoginMessage => {
    const now = getNow();

    return {
        message: `${LOGIN_MESSAGE} ${now.toLocaleString()}.`,
        nonce: dateAsSeconds(now)
    };
}
