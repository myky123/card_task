import styled from "styled-components";

const StyledProbabilityBoard = styled.div`
    text-align: center;
`;

type Props = {
    probability: {
        HEARTSPR: number;
        DIAMONDSPR: number;
        SPADESPR: number;
        CLUBSPR: number;
    };
};

export const ProbabilityBoard = ({ probability }: Props) => {
    return (
        <StyledProbabilityBoard>
            <h3>Snap suit probability</h3>
            <p>Probability 2x&#9827; {probability.CLUBSPR}%</p>
            <p>Probability 2x&#9824; {probability.SPADESPR}%</p>
            <p>Probability 2x&#9829; {probability.HEARTSPR}%</p>
            <p>Probability 2x&#9830; {probability.DIAMONDSPR}%</p>
        </StyledProbabilityBoard>
    );
};
