export type Card = {
    id: number;
    cost: number;
    hp: number;
    atk: number;
    mecanics: [];
    uid: number;
    baseHP?: number;
    state?: string;
}

// interface Board  {
//     id: number;
//     cost: number;
//     hp: number;
//     atk: number;
//     mecanics: [];
//     uid: number;
//     baseHP: number;
//     state: number;
// }

export interface Opponent {
    username?: string;
    heroClass?: string;
    hp: number;
    mp: number;
    board?: Card[];
    welcomeText?: string;
    remainingCardsCount: number;
    handSize: number;
}

export interface State {
    remainingTurnTime: string | number;
    yourTurn: boolean;
    hp: string | number;
    mp: string | number;
    maxMp: string | number;
    hand: Card[];
    board: Card[];
    welcomeText: string;
    heroClass: string;
    remainingCardsCount: string | number;
    opponent: Opponent;
    latestActions: [];
}