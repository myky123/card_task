import { cleanup, render, screen } from "@testing-library/react";
import { Snap } from "./Snap";

describe("<Snap />", () => {
    const testProps = {
        updateSnapValues: jest.fn(),
        updateSnapSuits: jest.fn(),
        cardData1: {
            cards: [
                {
                    image: "test-url",
                    suit: "test-suit",
                    value: "test-value",
                },
            ],
            remaining: 1,
        },
        cardData2: {
            cards: [
                {
                    image: "test-url",
                    suit: "test-suit",
                    value: "test-value",
                },
            ],
            remaining: 1,
        },
        isLoading: false,
    };

    afterEach(() => {
        cleanup();
    });

    test("renders snap values", () => {
        render(<Snap {...testProps} />);
        const snapValueText = screen.getByTestId("snap-value");

        expect(snapValueText).toBeInTheDocument();
    });

    test("renders snap suits", () => {
        const card2 = {
            cards: [
                {
                    image: "test-url",
                    suit: "test-suit",
                    value: "TEST-VALUE1",
                },
            ],
            remaining: 1,
        };

        render(<Snap {...testProps} cardData2={card2} />);
        const snapSuitText = screen.getByTestId("snap-suit");

        expect(snapSuitText).toBeInTheDocument();
    });
});
