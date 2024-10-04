import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("tests for rendering Contact us Component", () => {
  test("Should load contact us component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("Should load button inside contact us component", () => {
    render(<Contact />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("Should load button text correctly inside contact us component", () => {
    render(<Contact />);

    const button = screen.getByText("Submit");
    expect(button).toBeInTheDocument();
  });

  test("Should load input boxes correctly inside contact us component", () => {
    render(<Contact />);

    const input = screen.getAllByRole("textbox");
    expect(input.length).toBe(2);
  });

  test("Should load input box for name inside contact us component", () => {
    render(<Contact />);

    const input = screen.getByPlaceholderText("Write your name");
    expect(input).toBeInTheDocument();
  });
});
