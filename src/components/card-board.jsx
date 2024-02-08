import { useEffect, useState } from 'react';
import { fetchAll } from '../api/api';

export function CardBoard({ addCurtScore, resetScore }) {
    const [cardData, setCardData] = useState([]);

    function shuffleCard(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        fetchAll(21).then((data) => {
            setCardData(
                data.map((item) => {
                    return { ...item, isClick: false };
                }),
            );
        });
    }, []);

    function handleChoosenCard(cardId, cardIsClick) {
        const newCards = shuffleCard([...cardData]);
        const isLastUnclickCard = newCards.filter((card) => !card.isClick).length === 1;

        if (cardIsClick || isLastUnclickCard) {
            resetScore(isLastUnclickCard);
            return setCardData(
                newCards.map((card) => {
                    return {
                        ...card,
                        isClick: false,
                    };
                }),
            );
        }
        addCurtScore();
        setCardData(
            newCards.map((card) => {
                if (card.id === cardId) {
                    return { ...card, isClick: true };
                } else {
                    return card;
                }
            }),
        );
    }

    const renderCards = (cards) => {
        return cards.map((card) => {
            return (
                <div key={card.id} onClick={() => handleChoosenCard(card.id, card.isClick)}>
                    <div>
                        <img
                            src={`/img/${card.id}.jpg`}
                            alt={`${card.alias || card.name}-image`}
                        ></img>
                        <h3>{card.alias || card.name}</h3>
                    </div>
                </div>
            );
        });
    };

    const listCards = () => {
        const allCards = [...cardData];
        const choosenRenderCards = allCards.slice(0, 10);

        // For the first render, when none of the cards have been clicked yet, and when all cards have already been clicked.
        const allCardsIsClick = allCards.every((card) => card.isClick);
        const allCardsIsNotClick = allCards.every((card) => !card.isClick);
        if (allCardsIsClick || allCardsIsNotClick) {
            return renderCards(choosenRenderCards);
        }

        // Check whether the choosen render cards have isClick & !isClick, if not, reshuffle all cards and reset the state.
        const hasClickCards = choosenRenderCards.some((card) => card.isClick);
        const hasUnclickCards = choosenRenderCards.some((card) => !card.isClick);
        if (hasClickCards & hasUnclickCards) {
            return renderCards(choosenRenderCards);
        }

        return setCardData(shuffleCard(allCards));
    };

    return (
        <>
            <div className='grid-container'>{listCards()}</div>
        </>
    );
}
