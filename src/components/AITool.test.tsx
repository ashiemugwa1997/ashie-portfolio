import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AITool from "./AITool";

describe("AITool", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            choices: [{ text: "React is a JavaScript library for building user interfaces." }],
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders AI Tool component", () => {
    render(<AITool />);
    expect(screen.getByText("Interactive AI Tool")).toBeInTheDocument();
  });

  test("allows user to input text and receive AI response", async () => {
    render(<AITool />);

    const input = screen.getByPlaceholderText("Ask me anything...");
    const button = screen.getByText("Ask AI");

    fireEvent.change(input, { target: { value: "What is React?" } });
    fireEvent.click(button);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the AI response to be displayed
    const aiResponse = await waitFor(() =>
      screen.getByText("React is a JavaScript library for building user interfaces.")
    );
    expect(aiResponse).toBeInTheDocument();
  });
});
