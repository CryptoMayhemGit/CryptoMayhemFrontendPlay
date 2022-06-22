export interface RegisterMessage {
    message: string;
    nonce: number;
}

export interface RegisterResponse {
    success: boolean;
    userId: number;
}

export interface RegisterRequest {
    activationNotificationToken: string
}
