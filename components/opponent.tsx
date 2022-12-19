import { FunctionComponent } from "react";
import { Opponent } from "../common/state";

const Opponent: FunctionComponent<Opponent> = (props) => {
    return (
        <>
            <div className="opponent">
                <div className="opponent-hand info"></div>
                <div className="opponent-info">
                    <div className="opponent-hp info">{props.hp}</div>
                    <div className="opponent-class-frame"
                        style={{
                            background: `url(/images/class/${props.heroClass}.jpg)`,
                            backgroundSize: 'cover'
                        }}>
                    </div>
                    <div className="opponent-mp info">{props.mp}</div>
                </div>
                <div className="opponent-cards cards-remaining info">{props.remainingCardsCount}</div>
            </div>
        </>
    )
}

export default Opponent