import { ReactNode } from "react";
import styled from "styled-components";

const StyledCardContainer = styled.div`
    display: flex;
    position: relative;
    min-height: 25rem;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    border-top: 0.1px solid #71797e;
`;

type Props = {
    children: ReactNode;
};

export const CardContainer = ({ children }: Props) => {
    return <StyledCardContainer>{children}</StyledCardContainer>;
};
