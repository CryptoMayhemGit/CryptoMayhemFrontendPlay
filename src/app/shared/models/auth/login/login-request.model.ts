import { LoginMessage } from "./login-message.model";


export interface LoginRequest {

    wallet: string;
    signedMessage: string;
    messageToSign: LoginMessage;
    
}
