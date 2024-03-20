import { cleanup, render, screen } from "@testing-library/react";
import { Card } from "../Card/Card";
import { error } from "console";

describe("<Card />", () => {
    const elements = {
        testCard: "test-card",

        cardImage: "card-image",

        cardLoading: "card-loading",
    };

    const testProps = {
        cardData: {
            remaining: 1,

            cards: [
                { image: "test-url", suit: "test-suit", value: "test-value" },
            ],
        },

        isLoading: false,

        error: "",
    };

    afterEach(() => {
        cleanup();
    });

    test("renders blank card component", () => {
        render(<Card {...testProps} />);

        const cardComponent = screen.getByTestId(elements.testCard);

        expect(cardComponent).toBeInTheDocument();
    });

    test("renders card image when data", () => {
        render(<Card {...testProps} />);

        const cardComponentImage = screen.getByTestId(elements.cardImage);

        expect(cardComponentImage).toBeInTheDocument();

        expect(cardComponentImage).toHaveAttribute("src", "test-url");
    });

    test("renders error message when error", () => {
        const error = "Couldn't fetch data";

        render(<Card {...testProps} error={error} />);

        const cardComponent = screen.getByTestId(elements.testCard);

        expect(cardComponent).toBeInTheDocument();

        expect(cardComponent).toHaveTextContent(error);
    });

    test("renders loading component", () => {
        const isLoading = true;

        render(<Card {...testProps} isLoading={isLoading} />);

        const loadingComponent = screen.getByTestId(elements.cardLoading);

        expect(loadingComponent).toBeInTheDocument();
    });
});
