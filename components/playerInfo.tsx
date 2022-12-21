import { FunctionComponent } from "react"
import { State } from "../common/state"

const PlayerInfo: FunctionComponent<State> = (props) => {
    return (
        <>
            <div className="info-flex">
                <div className="info-hp info">{props.hp}</div>
                <div className="info-mp info">{props.mp}</div>
                <div className="info-cards cards-remaining info">{props.remainingCardsCount}</div>
            </div>
        </>
        
    )
}

export default PlayerInfo
