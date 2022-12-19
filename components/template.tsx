import { FunctionComponent } from "react";
import { UserSession } from "../common/commonProps";

const GameTemplate: FunctionComponent<UserSession> = ({userKey}) => {
    return (
        <>
            <div className="wrapper-game main-container">
                <div className="opponent">
                    <div className="opponent-hand info"></div>
                    <div className="opponent-info">
                        <div className="opponent-hp info">30</div>
                        <div className="opponent-class-frame"></div>
                        <div className="opponent-mp info">0</div>
                    </div>
                    <div className="opponent-cards cards-remaining info">30</div>
                </div>

                <div className="board" id="opponent-board"></div>

                <div className="board-chat">
                    <button className="toggle-chat"></button>
                    <div className="chat" id="chat">
                        <iframe style={{width: "700px", height: "240px"}}
                            src={`https://magix.apps-de-cours.com/server/#/chat/${userKey}`}
                        ></iframe>
                </div>
            </div>
            <div className="board" id="player-board"></div>

            <div className="bottom-section">
                <div className="info-flex">
                    <div className="info-hp info">30</div>
                    <div className="info-mp info">0</div>
                    <div className="info-cards cards-remaining info">30</div>
                </div>

                <div className="hand" id="hand"></div>

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
                    <div className="timer" id="timer">50</div>
                </div>

            </div>
            <div className="error-message"></div>
            <div className="waiting"></div>
        </div>
        </>
    )
}

export default GameTemplate