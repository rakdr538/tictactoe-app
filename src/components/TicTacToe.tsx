import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import { GameState } from "./GameState";
import Reset from "./Reset";
// @ts-ignore  
import gameOverSoundAsset from "../sounds/game_over.wav";
// @ts-ignore  
import clickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = .2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = .5;

const playerX = 'X';
const playerO = 'O';

const winningCombinations = [
    // Rows
    { combo: [0,1,2], strikeClass: "strike-row-1" },
    { combo: [3,4,5], strikeClass: "strike-row-2" },
    { combo: [6,7,8], strikeClass: "strike-row-3" },
    // Columns
    { combo: [0,3,6], strikeClass: "strike-column-1" },
    { combo: [1,4,7], strikeClass: "strike-column-2" },
    { combo: [2,5,8], strikeClass: "strike-column-3" },
    // Diagonals
    { combo: [0,4,8], strikeClass: "strike-diagonal-1" },
    { combo: [2,4,6], strikeClass: "strike-diagonal-2" }
];

function TicTacToe () {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(playerX);
    const [strikeClass, setStrikeClass] = useState<string | null>(null);
    const [gameState, setGameState] = useState(GameState.inProgress);

    const handleReset = () => {
        setTiles(Array(9).fill(null));
        setGameState(GameState.inProgress);
        setPlayer(playerX);
        setStrikeClass(null);
    }

    const handelTileClick = (index: number) => {
        // check if game is over
        if (gameState !== GameState.inProgress) {
            return;
        }

        // check if tile is alreay marked
        if(tiles[index] !== null){
            return;
        }

        const newTiles = [...tiles];
        newTiles[index] = player;
        setTiles(newTiles);

        // Switch player
        if(player === playerX) {
            setPlayer(playerO);
        } else {
            setPlayer(playerX);
        }
    };

    useEffect(()=> {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    useEffect(() => {
        if(tiles.some((tile) => tile !== null)){
            clickSound.play();
        }
    }, [tiles]);
    
    useEffect(() => {
        if(gameState !== GameState.inProgress){
            gameOverSound.play();
        }
    }, [gameState]);

 return (
    <div>
 <h1>Tic Tac Toe</h1>
 <Board 
    tiles={tiles}
    player={player}
    strikeClass={strikeClass}
    onTileClick={handelTileClick} />
    <GameOver gameState={gameState} />
    <Reset gameState={gameState} onReset={handleReset} />
 </div>
);
}

function checkWinner(tiles: Array<string>, setStrikeClass: Function, setGameState: Function) {
    for(const {combo, strikeClass} of winningCombinations){
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];

        if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            setStrikeClass(strikeClass);
            if (tileValue1 === playerX) {
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    if (tiles.every((tile) => tile!== null)) {
        setGameState(GameState.draw);
    }
}

export default TicTacToe;