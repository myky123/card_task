import { cleanup, render, screen } from "@testing-library/react";
import { Header } from "../Header/Header";

afterEach(() => {
    cleanup();
});

test("render header component", () => {
    render(<Header />);

    const headerComponent = screen.getByTestId("test-header");

    expect(headerComponent).toBeInTheDocument();
});

test("render header logo", () => {
    render(<Header />);

    const headerComponentLogo = screen.getByTestId("header-logo");

    expect(headerComponentLogo).toBeInTheDocument();
});
