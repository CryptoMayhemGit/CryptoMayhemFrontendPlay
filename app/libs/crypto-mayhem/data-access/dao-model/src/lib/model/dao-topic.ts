import { DaoAnswer } from "./dao-answer";

export interface DaoTopic {
    id: number;
    description: string;
    name: string;
    startDate: Date;
    endDate: Date;
    votesCount: number;

    answerRankings: DaoAnswer[];
}