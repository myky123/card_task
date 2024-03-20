import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { Snap } from "./components/Snap/Snap";
import { CardContainer } from "./components/CardContainer/CardContainer";
import { ControlsContainer } from "./components/ControlsContainer/ControlsContainer";

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
            </main>
        </>
    );
}

export default App;
