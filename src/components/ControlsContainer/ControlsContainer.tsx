import styled from "styled-components";

const StyledControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledButton = styled.button`
    width: 10rem;
    background-color: #0B60B0;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    transition: box-shadow 0.2s, -ms-transform 0.1s, 

    &:focus-visible {
        transform: scale(0.96);
    } 
    
    &:active {
        transform: scale(0.96);
    }
`;

const StyledMatchesBoard = styled.div`
    text-align: center;

    p {
        font-size: 1rem;
        font-weight: bold;
    }
`;

type Props = {
    cardsRemaining: number;
    drawCardHandler: () => void;
    passCardHandler: () => void;
    snapValues: number;
    snapSuits: number;
};

export const ControlsContainer = ({
    cardsRemaining,
    drawCardHandler,
    passCardHandler,
    snapValues,
    snapSuits,
}: Props) => {
    return (
        <StyledControlsContainer>
            {cardsRemaining > 0 && (
                <>
                    <StyledButton
                        onClick={() => {
                            drawCardHandler();
                            passCardHandler();
                        }}
                    >
                        Draw card
                    </StyledButton>

                    <span>Cards in the deck: {cardsRemaining}</span>
                </>
            )}

            {!cardsRemaining && (
                <StyledMatchesBoard>
                    <p>VALUE MATCHES: {snapValues}</p>

                    <p>SUIT MATCHES: {snapSuits}</p>
                </StyledMatchesBoard>
            )}
        </StyledControlsContainer>
    );
};
