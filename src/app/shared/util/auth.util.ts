import { REGISTER_MESSAGE, LOGIN_MESSAGE } from "../config/auth.config"

import { RegisterMessage } from "../models/auth/register/register-message.model";
import { LoginMessage } from "../models/auth/login/login-message.model";

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
