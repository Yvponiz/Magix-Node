import { NextPage } from "next"
import { useState } from "react";
import commonProps, { UserSession } from "../common/commonProps";

export function getServerSideProps({}) {
    return commonProps({})
}

const Lobby: NextPage<UserSession> = ({userKey}) => {
    const [displayDiv, setDisplayDiv] = useState(false);
    const handleClick = () => {
        setDisplayDiv(!displayDiv);
    };

    return (
        <>
            <div className="wrapper-lobby main-container">
                <div className="deck-manager" style={{ display: displayDiv ? 'flex' : 'none' }} >
                    <iframe style={{ width: "100%" }} src={`https://magix.apps-de-cours.com/server/#/deck/${userKey}`}></iframe>
                    <button className="deck-manager-close" onClick={handleClick}>Close</button>
                </div>

                <div className="menu-title">
                    Mode de jeu
                </div>

                <div className="menu">
                    <div className="choice">
                        <a href={`/api/gameMode?play=true&userKey=${userKey}`}>Mission</a>
                    </div>
                    <div className="choice">
                        <a href={`/api/gameMode?practice=true&userKey=${userKey}`}>Training</a>
                    </div>
                    <div className="choice">
                        <span className="lobby-deck-btn" onClick={handleClick}>Deck</span>
                    </div>
                    <div className="choice">
                        <a href="notes.php">Notes</a>
                    </div>
                    <div className="choice">
                        <a href={`/api/signOut?logout=true&userKey=${userKey}`}>Exit</a>
                    </div>
                </div>

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