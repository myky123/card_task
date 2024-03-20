import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { Snap } from "./components/Snap/Snap";
import { CardContainer } from "./components/CardContainer/CardContainer";
import { ControlsContainer } from "./components/ControlsContainer/ControlsContainer";
import { ProbabilityBoard } from "./components/ProbabilityBoard/ProbabilityBoard";

function App() {
    const [card1, setCard1] = useState({
        cards: [
            {
                image: "https://www.deckofcardsapi.com/static/img/back.png",
                suit: "",
                value: "",
            },
        ],
        remaining: 52,
    });
    const [card2, setCard2] = useState({
        cards: [
            {
                image: "https://www.deckofcardsapi.com/static/img/back.png",
                suit: "",
                value: "",
            },
        ],
        remaining: 52,
    });
    const [deckId, setDeckId] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    /* Snap states are managed within the Snap component */
    const [snapValues, setSnapValues] = useState(0);
    const [snapSuits, setSnapSuits] = useState(0);
    const [availableSuits, setAvailableSuits] = useState({
        HEARTS: 13,
        DIAMONDS: 13,
        SPADES: 13,
        CLUBS: 13,
    });
    const [probability, setProbability] = useState({
        HEARTSPR: 0,
        DIAMONDSPR: 0,
        SPADESPR: 0,
        CLUBSPR: 0,
    });

    const drawCardHandler = async () => {
        try {
            setIsLoading(true);

            const drawCardUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;

            const response = await fetch(drawCardUrl);
            if (!response?.ok) {
                throw Error("Couldn't fetch data");
            }

            const card = await response.json();

            setIsLoading(false);
            setCard1(card);
            setError("");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const fetchDeckHandler = async (numberOfDecks: number) => {
        try {
            const drawDeckUrl = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_counT=${numberOfDecks}`;

            const response = await fetch(drawDeckUrl);

            if (!response?.ok) {
                throw Error("Couldn't fetch data");
            }

            const deck = await response.json();

            // get deck_id from the deck object
            const { deck_id } = deck;

            setDeckId(deck_id);

            // reset error
            setError("");

            setIsLoading(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const passCardHandler = () => {
        setCard1((prevState) => {
            setCard2(prevState);
            return prevState;
        });
    };

    const calcProbability = (
        desiredPosibilities: number,
        allPossibilities: number
    ) => {
        if (allPossibilities === 0 || desiredPosibilities === 0) {
            return;
        }

        let probability =
            (desiredPosibilities / allPossibilities) *
            ((desiredPosibilities - 1) / (allPossibilities - 1));

        probability = Math.round((probability + Number.EPSILON) * 1000) / 1000;
        const probabilityPercentage = (probability * 100).toFixed(2);
        return probabilityPercentage;
    };

    const updateProbability = useCallback(() => {
        const cardSuit = card1.cards[0].suit;
        let availableSuitsCopy: { [key: string]: any } = {};
        let updatedValues: { [key: string]: any } = {};

        availableSuitsCopy = { ...availableSuits };
        updatedValues = {};

        for (const key in availableSuitsCopy) {
            // console.log(cardSuit);
            if (key === `${cardSuit}PR`) {
                updatedValues[`${key}PR`] = calcProbability(
                    availableSuitsCopy[cardSuit],
                    card1.remaining
                );
            } else {
                updatedValues[`${key}PR`] = calcProbability(
                    availableSuitsCopy[key],
                    card1.remaining
                );
            }
        }

        setProbability((prevState) => ({
            ...prevState,
            ...updatedValues,
        }));
    }, [card1]);

    useEffect(() => {
        type SuitCounts = {
            HEARTS: number;
            DIAMONDS: number;
            SPADES: number;
            CLUBS: number;
        };

        if (card1.remaining === 52) return;
        const cardSuit = card1.cards[0].suit;

        setAvailableSuits((prevState: SuitCounts) => ({
            ...prevState,
            [cardSuit]: prevState[cardSuit as keyof SuitCounts] - 1,
        }));
        updateProbability();
    }, [card1, updateProbability]);

    useEffect(() => {
        fetchDeckHandler(1);
    }, []);
    return (
        <>
            <Header />
            <main>
                <CardContainer>
                    <Card error={error} isLoading={false} cardData={card2} />
                    <Card
                        error={error}
                        isLoading={isLoading}
                        cardData={card1}
                    />
                    <Snap
                        isLoading={isLoading}
                        updateSnapValues={setSnapValues}
                        updateSnapSuits={setSnapSuits}
                        cardData1={card1}
                        cardData2={card2}
                    />
                </CardContainer>
                <ControlsContainer
                    cardsRemaining={card1.remaining}
                    drawCardHandler={drawCardHandler}
                    passCardHandler={passCardHandler}
                    snapSuits={snapSuits}
                    snapValues={snapValues}
                ></ControlsContainer>
                <ProbabilityBoard probability={probability} />
            </main>
        </>
    );
}

export default App;
