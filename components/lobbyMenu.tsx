import { useRouter } from 'next/router'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'

const LobbyMenu: FunctionComponent<{ userKey: string | any }> = (props) => {
    const { userKey } = props;
    const [displayDiv, setDisplayDiv] = useState(false);
    const router = useRouter()

    const handleClick = (source: string) => {
        switch (source) {
            case 'deckManager':
                setDisplayDiv(!displayDiv);
                break;
            case 'signOut':
                fetch(`/api/signOut?logout=true&userKey=${userKey}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === 'redirect') {
                            router.push(data.url)
                        }
                    })
                break;
            case 'play':
                fetch(`/api/gameMode?play=true&userKey=${userKey}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === 'redirect') {
                            router.push(data.url)
                        }
                    })
                break;
            case 'practice':
                fetch(`/api/gameMode?practice=true&userKey=${userKey}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === 'redirect') {
                            router.push(data.url)
                        }
                    })
                break;

            default:
                console.log('Invalid click source');
        }
    };

    return (
        <>
            <div className="deck-manager" style={{ display: displayDiv ? 'flex' : 'none' }} >
                <iframe style={{ width: "100%" }} src={`https://magix.apps-de-cours.com/server/#/deck/${userKey}`}></iframe>
                <button className="deck-manager-close" onClick={() => handleClick('deckManager')}>Close</button>
            </div>
            <div className="menu">
                <div className="choice">
                    <a onClick={() => handleClick('play')}>
                        Mission
                    </a>
                </div>
                <div className="choice">
                    <a onClick={() => handleClick('practice')}>
                        Training
                    </a>
                </div>
                <div className="choice">
                    <a className="lobby-deck-btn" onClick={() => handleClick('deckManager')}>
                        Deck
                    </a>
                </div>

                <div className="choice">
                    <a onClick={() => handleClick('signOut')}>
                        Exit
                    </a>
                </div>
            </div>
        </>
    )
}

export default LobbyMenu
