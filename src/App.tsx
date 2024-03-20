import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";

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
            <>
                <Card error={error} isLoading={false} cardData={card2} />
                <Card error={error} isLoading={isLoading} cardData={card1} />
            </>
            <button
                onClick={() => {
                    drawCardHandler();
                    passCardHandler();
                }}
            >
                LOAD
            </button>
        </>
    );
}

export default App;
