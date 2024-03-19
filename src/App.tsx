import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";

function App() {
    const [deckId, setDeckId] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDeckHandler = async (numberOfDecks: number) => {
        try {
            const drawDeckUrl = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numberOfDecks}`;

            const response = await fetch(drawDeckUrl);

            const deck = await response.json();

            // get deck_id from the deck object
            const { deck_id } = deck;

            setDeckId(deck_id);

            // reset error
            setError(null);

            setIsLoading(false);
        } catch (error: any) {
            setError(error?.message);
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
