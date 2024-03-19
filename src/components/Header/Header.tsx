import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 3.5rem;

    p {
        margin-left: 0.5rem;
        font-size: 1.3rem;
    }

    span {
        display: inline-block;
        height: 1.5rem;
        width: 1.5rem;
        border: 1px solid black;
        border-radius: 50%;
        margin: 0.1rem;

        &:last-child {
            margin-right: 0.5rem;
            border: 1px solid #007fff;
        }
    }
`;

export const Header = () => {
    return (
        <StyledHeader data-testid="test-header">
            <p>SNAP!</p>

            <div data-testid="header-logo">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </StyledHeader>
    );
};
