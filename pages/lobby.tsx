import { NextPage } from "next"
import { useState } from "react";
import commonProps, { UserSession } from "../common/commonProps";
import Menu from "../components/lobbyMenu";

export function getServerSideProps({}) {
    return commonProps({})
}

const Lobby: NextPage<UserSession> = ({userKey}) => {
    return (
        <>
            <div className="wrapper-lobby main-container">
                <div className="menu-title">
                    Mode de jeu
                </div>

                <Menu userKey={userKey} />

                <div className="codec">
                    <div className="left-codec">
                        <img src={"/images/gifs/campbell-codec.gif"} alt="Campbell Codc" />
                    </div>
                    <iframe
                        style={{ width: "700px", height: "240px", backgroundColor: "rgba(36, 102, 50, 0.700)" }}
                        src={`https://magix.apps-de-cours.com/server/#/chat/${userKey}`}
                    ></iframe>
                    <div className="right-codec">
                        <img src={"/images/gifs/snake-codec.gif"} alt="Snake Codec" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lobby