import { GameState } from "./GameState";

interface Props {
    gameState: number
}

const GameOver: React.FC<Props> = ({gameState}) => {
    switch(gameState) {
        case GameState.inProgress:
            return <></>;
        case GameState.draw:
            return <div className="game-over">Draw</div>
        case GameState.playerXWins:
            return <div className="game-over">X Wins</div>
        case GameState.playerOWins:
            return <div className="game-over">O Wins</div>
        default:
            return <></>
    }
}

export default GameOver;