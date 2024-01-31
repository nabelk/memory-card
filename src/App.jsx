import { useState } from 'react';
import './App.css';
import { ScoreBoard } from './components/scoreboard';
import { CardBoard } from './components/card-board';

export function App() {
    const [scores, setScores] = useState([
        { name: 'curtScore', score: 0 },
        { name: 'bestScore', score: 0 },
    ]);

    return (
        <>
            <ScoreBoard scores={scores}></ScoreBoard>
            <CardBoard></CardBoard>
        </>
    );
}
