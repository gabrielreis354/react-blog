import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from ".";
import { describe, expect, test, jest } from "@jest/globals";

describe("<Button />", () => {
  test("should render the button with the text 'Load More'", () => {
    render(<Button text="Load More" />);

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();
  });
  test("should call function on button click", () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} />);

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1); // Verifica se a função foi chamada
  });
  test("should be disabled when disabled is true", () => {
    render(<Button text="Load More" disabled={true} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeDisabled();
  });
  test("should be enabled when disabled is false", () => {
    render(<Button text="Load More" disabled={false} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeEnabled();
  });
});
