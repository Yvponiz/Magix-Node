import { NextPage } from "next"
import Image from "next/image"

const Lobby: NextPage = () => {
    let key;

    if(typeof window !== 'undefined'){
        key = sessionStorage.getItem("userKey")
        console.log("GETKEY",key)
    }

    return (
        <>
            <div className="wrapper-lobby main-container">
                <div className="deck-manager">
                    <iframe style={{width:"100%"}} src={`https://magix.apps-de-cours.com/server/#/deck/${key}`}></iframe>
                    <button className="deck-manager-close">Close</button>
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
                        <span className="lobby-deck-btn">Deck</span>
                    </div>
                    <div className="choice">
                        <a href="notes.php">Notes</a>
                    </div>
                    <div className="choice">
                        <a href="?logout=true">Exit</a>
                    </div>
                </div>

                <div className="codec">
                    <div className="left-codec">
                        <img src={"/images/gifs/campbell-codec.gif"}alt="Campbell Codc"/>
                    </div>
                    <iframe 
                        style={{width:"700px",height:"240px"}}
                        // onLoad={applyStyles(this)}
                        src={`https://magix.apps-de-cours.com/server/#/chat/${key}`}
                        >
                    </iframe>
                    <div className="right-codec">
                        <img src={"/images/gifs/snake-codec.gif"} alt="Snake Codec"/>
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