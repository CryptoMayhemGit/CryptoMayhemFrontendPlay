import { RegisterMessage } from "./register-message.model";


export interface RegisterRequest {

    wallet: string;
    signedMessage: string;
    messageToSign: RegisterMessage;
    
}
