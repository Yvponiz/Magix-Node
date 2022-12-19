import { NextPage } from "next"
import { useEffect, useState } from "react"
import { action, callAPI } from "../common/commonAction"
import commonProps, { UserSession } from "../common/commonProps"
import { State } from "../common/state"
import Card from "../components/cardDiv"
import Opponent from "../components/opponent"
import GameTemplate from "../components/template"

export function getServerSideProps({ }) {
    return commonProps({})
}

const Game: NextPage<UserSession> = ({ userKey }) => {
    const data: any = {}
    data.key = userKey;
    const [state, setState] = useState<State>();

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const s = await callAPI('games/state', data)
                console.log(s)
                setState(s as State);
            } catch (error) {
                console.error(error);
            }
        }, 1000);

        // clean up interval when component is unmounted
        return () => clearInterval(interval);
    }, []);

    if (state) {

        return (
            <>
                <div className="wrapper-game main-container">
                    {state.opponent && <Opponent
                        hp={state.opponent.hp}
                        mp={state.opponent.mp}
                        remainingCardsCount={state.opponent.remainingCardsCount}
                        handSize={state.opponent.handSize}
                        heroClass={state.opponent.heroClass}
                    />}

                    <div className="board" id="opponent-board">
                        {state.opponent?.board?.map((card: any) => (
                            <Card
                                key={card.id}
                                id={card.id}
                                cost={card.cost}
                                hp={card.hp}
                                atk={card.atk}
                                mecanics={[]}
                                uid={card.uid} />
                        ))}
                    </div>

                    <div className="board-chat">
                        {/* <button className="toggle-chat" onclick="showChat()"></button> */}
                        <div className="chat" id="chat">
                            <iframe style={{ width: "700px", height: "240px" }}
                                src={`https://magix.apps-de-cours.com/server/#/chat/${userKey}`}>
                            </iframe>
                        </div>
                    </div>

                    <div className="board" id="player-board">
                        {state.board?.map((card: any) => (
                            <Card
                                key={card.id}
                                id={card.id}
                                cost={card.cost}
                                hp={card.hp}
                                atk={card.atk}
                                mecanics={[]}
                                uid={card.uid} />
                        ))}
                    </div>


                    <div className="bottom-section">
                        <div className="info-flex">
                            <div className="info-hp info">30</div>
                            <div className="info-mp info">0</div>
                            <div className="info-cards cards-remaining info">30</div>
                        </div>

                        <div className="hand" id="hand">
                            {state.hand?.map((card: any) => (
                                <Card
                                    key={card.id}
                                    id={card.id}
                                    cost={card.cost}
                                    hp={card.hp}
                                    atk={card.atk}
                                    mecanics={[]}
                                    uid={card.uid} />
                            ))}
                        </div>

                        <div className="right-flex">
                            <div className="right-flex-choice">
                                <button id="hero-power">Hero Power</button>
                            </div>
                            <div className="right-flex-choice">
                                <button id="end-turn">End Turn</button>
                            </div>
                            <div className="right-flex-choice">
                                <button id="surrender">Surrender</button>
                            </div>
                            <div className="timer" id="timer">{state.remainingTurnTime}</div>
                        </div>

                    </div>
                    <div className="error-message"></div>
                    <div className="waiting"></div>
                </div>
            </>
        )
    }
    else
        return (
            <><GameTemplate /></>
        )
}

export default Game