import React from "react";
import styled from "styled-components";

const StyledLoadingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    width: 100%;
    text-align: center;
    height: 100%;
`;

type Props = {
    text: string;
};

export const Loading = ({ text }: Props) => {
    return <StyledLoadingWrapper>{text}</StyledLoadingWrapper>;
};
