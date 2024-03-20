import styled, { keyframes } from "styled-components";
import { Dispatch, SetStateAction, useEffect } from "react";
import { CardProps } from "../../types";

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
    top: 0;
    min-height: 2.5rem;
    min-width: 6rem;
    font-size: 2.8rem;
    font-weight: bold;
    color: #800000;
    animation: ${rotate} 0.5s linear;
`;

type Props = {
    updateSnapValues: Dispatch<SetStateAction<number>>;
    updateSnapSuits: Dispatch<SetStateAction<number>>;
    cardData1: {
        cards: CardProps[];
        remaining: number;
    };
    cardData2: {
        cards: CardProps[];
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
    // get data from the cardData object
    const card1Suit = cardData1 ? cardData1?.cards[0]?.suit : "";

    const card2Suit = cardData2 ? cardData2?.cards[0]?.suit : "";

    const card1Value = cardData1 ? cardData1?.cards[0]?.value : "";

    const card2Value = cardData2 ? cardData2?.cards[0]?.value : "";

    const cardsRemaining = cardData1.remaining;

    // States management
    useEffect(() => {
        if (!isLoading && cardsRemaining < 52) {
            if (card1Value === card2Value) {
                updateSnapValues((prevState) => prevState + 1);
            } else if (card1Suit === card2Suit) {
                updateSnapSuits((prevState) => prevState + 1);
            }
        }
    }, [
        card1Suit,
        card2Suit,
        card1Value,
        card2Value,
        updateSnapValues,
        updateSnapSuits,
        isLoading,
        cardsRemaining,
    ]);

    // DOM management

    if (cardsRemaining < 52 && !isLoading && card1Value === card2Value) {
        return (
            <StyledSnapWrapper data-testid="snap-value">
                SNAP VALUE!
            </StyledSnapWrapper>
        );
    }
    // if initial state (cards=52), don't render
    // if isLoading is true, don't render -> cards will have for a second the same value, waiting for state update
    if (cardsRemaining < 52 && !isLoading && card1Suit === card2Suit) {
        return (
            <StyledSnapWrapper data-testid="snap-suit">
                SNAP SUIT!
            </StyledSnapWrapper>
        );
    }
    return null;
};
