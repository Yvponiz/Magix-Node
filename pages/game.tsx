import { NextPage } from "next"
import { useEffect, useRef, useState } from "react"
import { action, callAPI } from "../common/commonAction"
import commonProps, { UserSession } from "../common/commonProps"
import { State } from "../common/state"
import Card from "../components/cardDiv"
import Opponent from "../components/opponent"
import PlayerInfo from "../components/playerInfo"
import GameTemplate from "../components/template"

export function getServerSideProps({ }) {
    return commonProps({})
}

const Game: NextPage<UserSession> = ({ userKey }) => {
    const data: any = {}
    const [state, setState] = useState<State>();
    const [waiting, setWaiting] = useState<string>("Finding an opponent...");
    const [displayDiv, setDisplayDiv] = useState<string>("none");

    let yourTurn = false;
    let firstRender = true;
    let attacker = null;
    let taunt = false;
    let border = "solid 4px gray";
    let opacity = "100%"

    data.key = userKey;

    useEffect(() => {
        const interval = setInterval(async () => {
            const s: any | string = await callAPI('games/state', data)
            setState(s);
            HandleData(s, yourTurn)
            console.log(s)
        }, 1000);

        return () => clearInterval(interval);
    }, [waiting]);

    function HandleData(data: string | any, yourTurn: boolean) {
        if (data === "LAST_GAME_LOST") {
            setTimeout(function () {
                window.location.href = "/lobby";
            }, 2000);
        }
        else if (data === "LAST_GAME_WON") {
            setTimeout(function () {
                window.location.href = "/lobby";
            }, 2000);
        }
        else if (data != "WAITING") {
            setDisplayDiv("none");
            yourTurn = data.yourTurn;
        }
        else {
            console.log("display", displayDiv)
            setDisplayDiv("flex");
            setWaiting(waiting);
            if (waiting === "Finding an opponent...") {
                setWaiting("Finding an opponent");
            }
            else {
                setWaiting(waiting + ".");
            }
        }
    }


    if (state) {

        return (
            <>
                <div className="wrapper-game main-container">
                    <div className="opponent">
                        {state.opponent && <Opponent
                            hp={state.opponent.hp}
                            mp={state.opponent.mp}
                            remainingCardsCount={state.opponent.remainingCardsCount}
                            handSize={state.opponent.handSize}
                            heroClass={state.opponent.heroClass}
                        />}
                    </div>

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
                        <PlayerInfo
                            hp={state.hp}
                            mp={state.mp}
                            remainingCardsCount={state.remainingCardsCount}
                        />

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
                    <div className="waiting" style={{ display: displayDiv}}> {waiting} </div>
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

