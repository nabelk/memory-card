import { useState } from 'react';
import './App.css';
import { CardBoard } from './components/card-board';
import { Header } from './components/header';

export function App() {
    const [scores, setScores] = useState([
        { name: 'curtScore', score: 0 },
        { name: 'bestScore', score: 0 },
    ]);

    function handleAddScore() {
        setScores(
            [...scores].map((item) => {
                if (item.name === 'curtScore') {
                    return {
                        ...item,
                        score: item.score + 1,
                    };
                }
                return item;
            }),
        );
    }
    function setBestAndResetCurrentScore(isLastCard) {
        let bestScore = 0;
        setScores(
            [...scores].map((item) => {
                if (item.name === 'curtScore') {
                    bestScore = item.score;
                    return {
                        ...item,
                        score: 0,
                    };
                }
                return { ...item, score: isLastCard ? bestScore + 1 : bestScore };
            }),
        );
    }

    return (
        <>
            <Header scores={scores}></Header>
            <CardBoard
                addCurtScore={handleAddScore}
                resetScore={setBestAndResetCurrentScore}
            ></CardBoard>
        </>
    );
}
