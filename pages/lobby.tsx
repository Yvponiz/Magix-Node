import { NextPage } from "next"
import { MouseEvent, useState } from "react";
import commonProps, { User } from "../common/commonProps";

export function getServerSideProps({}) {
    return commonProps({})
}

const Lobby: NextPage<User> = ({userKey}) => {
    const logOutKey: any = {}
    logOutKey.key = userKey;

    const [deckVisibility, setDeckVisibility] = useState(false);
    let display;

    const handleClick = () => {
        setDeckVisibility((visible) => !visible)
        if (!deckVisibility) {
            display = "flex"
        }
        else {
            display = "none"
        }
        console.log("DECKVIS", deckVisibility, "\n", "DISPLAY", display)
    };

    return (
        <>
            <div className="wrapper-lobby main-container">
                <div className="deck-manager" style={{ display: display }} >
                    <iframe style={{ width: "100%" }} src={`https://magix.apps-de-cours.com/server/#/deck/${userKey}`}></iframe>
                    <button className="deck-manager-close" onClick={handleClick}>Close</button>
                </div>

                <div className="menu-title">
                    Mode de jeu
                </div>

                <div className="menu">
                    <div className="choice">
                        <a href="?play=true">Mission</a>
                    </div>
                    <div className="choice">
                        <a href="?practice=true">Training</a>
                    </div>
                    <div className="choice">
                        <span className="lobby-deck-btn" onClick={handleClick}>Deck</span>
                    </div>
                    <div className="choice">
                        <a href="notes.php">Notes</a>
                    </div>
                    <div className="choice">
                        <a href={`/api/submitSignOut?logout=true&userKey=${userKey}`}>Exit</a>
                    </div>
                </div>

                <div className="codec">
                    <div className="left-codec">
                        <img src={"/images/gifs/campbell-codec.gif"} alt="Campbell Codc" />
                    </div>
                    <iframe
                        style={{ width: "700px", height: "240px" }}
                        // onLoad={applyStyles(this)}
                        src={`https://magix.apps-de-cours.com/server/#/chat/${userKey}`}
                    >
                    </iframe>
                    <div className="right-codec">
                        <img src={"/images/gifs/snake-codec.gif"} alt="Snake Codec" />
                    </div>
                </div>
            </div>

        </>
    )

}

// const applyStyles = iframe => {
// 	let styles = {
// 		fontColor : "white",
// 		backgroundColor : "rgba(36, 102, 50, 0.700)",
// 		fontGoogleName : "Helvetica",
// 		fontSize : "1em",
// 		hideIcons : false,
// 		inputBackgroundColor : "rgba(0, 0, 0, 0)",
// 		inputFontColor : "white"
// 	}

// 	setTimeout(() => {
// 		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
// 	}, 1000);
// };

export default Lobby