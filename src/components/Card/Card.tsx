import { Loading } from "../Loading/Loading";
import styled from "styled-components";

const StyledCardWrapper = styled.div`
    display: flex;
    height: 18rem;
    width: 13rem;
    border-radius: 10px;
    border: 1px solid black;
    background-color: whitesmoke;

    img {
        width: 100%;
        height: 100%;
    }
`;

const StyledErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    height: 100%;
`;

const StyledErrorLabel = styled.p`
    color: red;
    font-size: 1.3rem;
    font-weight: bold;
`;

type Props = {
    cardData: {
        cards: { image: string; suit: string; value: string }[];
        remaining: number;
    };
    isLoading: boolean;
    error: string;
};

export const Card = ({ cardData, isLoading, error }: Props) => {
    const imgElement = (
        <img
            src={cardData?.cards[0]?.image}
            alt={`Card ${cardData?.cards[0]?.suit} ${cardData?.cards[0]?.value}`}
        />
    );

    return (
        <StyledCardWrapper data-testid="test-card">
            {!error && isLoading && <Loading text="Loading..." />}

            {error && (
                <StyledErrorWrapper>
                    <StyledErrorLabel>{error}</StyledErrorLabel>
                </StyledErrorWrapper>
            )}

            {!isLoading && cardData && cardData?.remaining > 0 && imgElement}
        </StyledCardWrapper>
    );
};
