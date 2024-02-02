import { useEffect, useState } from 'react';

export function CardBoard() {
    const [cardData, setCardData] = useState([]);

    function shuffleCard(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }

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

        fetchAll(21).then((data) => {
            setCardData(
                data.map((item) => {
                    return { ...item, isClick: false };
                }),
            );
        });
    }, []);

    function handleChoosenCard(cardId) {
        setCardData(
            shuffleCard([...cardData]).map((card) => {
                if (card.id === cardId) {
                    return { ...card, isClick: true };
                } else {
                    return card;
                }
            }),
        );
    }

    const listCards = cardData.map((card, index) => {
        if (index <= 9) {
            return (
                <div
                    key={card.id}
                    onClick={() => handleChoosenCard(card.id)}
                    style={{ backgroundColor: !card.isClick ? 'pink' : 'green' }}
                >
                    <img
                        style={{ width: '200px', height: '200px' }}
                        src={`/img/${card.id}.jpg`}
                        alt={`${card.alias || card.name}-image`}
                    ></img>
                    <p>{card.alias || card.name}</p>
                </div>
            );
        }
    });

    return (
        <>
            <div className='grid-container'>{listCards}</div>
        </>
    );
}
