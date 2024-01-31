import { useEffect, useState } from 'react';

export function CardBoard() {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        async function fetchData(id) {
            const response = await fetch(
                `https://project-heist-rahulv07.vercel.app/characters/${id}`,
                {
                    mode: 'cors',
                },
            );
            const characterData = await response.json();
            return characterData;
        }

        async function fetchAll(maxId) {
            const promises = [];
            for (let i = 1; i <= maxId; i++) {
                promises.push(fetchData(i));
            }
            const data = await Promise.all(promises);
            if (data.length !== maxId) return fetchAll(maxId);
            return data;
        }

        fetchAll(21).then((data) => setCardData(data));
    }, []);

    const listCards = cardData.map((card) => (
        <div key={card.id}>
            <img
                style={{ width: '200px', height: '200px' }}
                src={`/img/${card.id}.jpg`}
                alt={`${card.alias || card.name}-image`}
            ></img>
            <p>{card.alias || card.name}</p>
        </div>
    ));

    return (
        <>
            <div>{listCards}</div>
        </>
    );
}
