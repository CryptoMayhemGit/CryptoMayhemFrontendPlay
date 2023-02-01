import { SignData } from "./sign-data";

export interface SetVoteRequest {
    wallet: string;
    signedMessage: string;
    signData: SignData;
}