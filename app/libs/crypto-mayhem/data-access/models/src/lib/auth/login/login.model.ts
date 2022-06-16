export interface LoginRequest {
    wallet: string;
    signedMessage: string;
    messageToSign: LoginMessage;
}

export interface LoginMessage {
    message: string;
    nonce: number;
}

export interface LoginResponse {
    token: string;
}
