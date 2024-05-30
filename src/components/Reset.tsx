import { GameState } from "./GameState";

interface Props {
    gameState: number
    onReset: React.MouseEventHandler<HTMLButtonElement>
}

const Reset: React.FC<Props> = ({gameState, onReset}) => {
    if(gameState === GameState.inProgress) {
        return <></>;
    }
    return ( <button onClick={onReset} className="reset-button">Reset</button> );
}

export default Reset;