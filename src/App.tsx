import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";

function App() {
    const [card1, setCard1] = useState();
    const [card2, setCard2] = useState();
    const [deckId, setDeckId] = useState("");
    const [error, setError] = useState("");
    const [cardsLeft, setCardsLeft] = useState(52);
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
            setCardsLeft(card.remaining);
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

    useEffect(() => {
        fetchDeckHandler(1);
    }, []);
    return (
        <>
            <Header />
        </>
    );
}

export default App;
