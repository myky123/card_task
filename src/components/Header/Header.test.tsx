import { cleanup, render, screen } from "@testing-library/react";
import { Header } from "../Header/Header";

describe("<Header />", () => {
    const elements = {
        testHeader: "test-header",

        headerLogo: "header-logo",
    };

    afterEach(() => {
        cleanup();
    });

    test("render header component", () => {
        render(<Header />);

        const headerComponent = screen.getByTestId(elements.testHeader);

        expect(headerComponent).toBeInTheDocument();
    });

    test("render header logo", () => {
        render(<Header />);

        const headerComponentLogo = screen.getByTestId(elements.headerLogo);

        expect(headerComponentLogo).toBeInTheDocument();
    });
});
