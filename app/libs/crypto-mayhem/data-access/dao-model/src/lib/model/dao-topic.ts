import { DaoAnswer } from "./dao-answer";

export interface DaoTopic {
    id: number;
    description: string;
    name: string;
    startDate: Date;
    stopDate: Date;
    votesCount: number;
    canVote: boolean;
    votedAnswerId: number;
    userVotePower: number;

    answerRankings: DaoAnswer[];
}