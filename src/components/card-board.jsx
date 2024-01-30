import { useEffect, useState } from 'react';

export function CardBoard() {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        async function fetchData(id) {
            const response = await fetch(
                `https://project-heist-rahulv07.vercel.app/characters/${id}`,
                { mode: 'cors' },
            );
            const characterData = response.json();
            return characterData;
        }
    }, []);
}
