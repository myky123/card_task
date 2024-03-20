import styled, { keyframes } from "styled-components";
import { Dispatch, SetStateAction, useEffect } from "react";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSnapWrapper = styled.div`
    position: absolute;
    top: 0.5rem;
    min-height: 2rem;
    min-width: 6rem;
    font-size: 3rem;
    font-weight: bold;
    color: #800000;
    animation: ${rotate} 0.5s linear;
`;

type Props = {
    updateSnapValues: Dispatch<SetStateAction<number>>;
    updateSnapSuits: Dispatch<SetStateAction<number>>;
    cardData1: {
        cards: { image: string; suit: string; value: string }[];
        remaining: number;
    };
    cardData2: {
        cards: { image: string; suit: string; value: string }[];
        remaining: number;
    };
    isLoading: boolean;
};

export const Snap = ({
    updateSnapValues,
    updateSnapSuits,
    cardData1,
    cardData2,
    isLoading,
}: Props) => {
    const card1Suit = cardData1 ? cardData1?.cards[0]?.suit : "";

    const card2Suit = cardData2 ? cardData2?.cards[0]?.suit : "";

    const card1Value = cardData1 ? cardData1?.cards[0]?.value : "";

    const card2Value = cardData2 ? cardData2?.cards[0]?.value : "";

    const carsLeft = cardData1.remaining;

    // States management
    useEffect(() => {
        if (cardData1 && cardData2 && card1Value === card2Value) {
            updateSnapValues((prevState) => prevState + 1);
        } else if (cardData1 && cardData2 && card1Suit === card2Suit) {
            updateSnapSuits((prevState) => prevState + 1);
        }
    }, [
        cardData1,
        cardData2,
        card1Suit,
        card2Suit,
        card1Value,
        card2Value,
        updateSnapValues,
        updateSnapSuits,
    ]);

    // DOM management

    if (carsLeft < 52 && !isLoading && card1Value === card2Value) {
        return (
            <StyledSnapWrapper data-testid="snap-value">
                SNAP VALUE!
            </StyledSnapWrapper>
        );
    }
    if (carsLeft < 52 && !isLoading && card1Suit === card2Suit) {
        return (
            <StyledSnapWrapper data-testid="snap-suit">
                SNAP SUIT!
            </StyledSnapWrapper>
        );
    }
    return null;
};
