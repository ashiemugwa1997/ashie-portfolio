import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AITool from "./AITool";
import * as geminiApi from "../utils/geminiApi";

describe("AITool", () => {
  beforeEach(() => {
    // Mock the askGemini function instead of fetch
    jest.spyOn(geminiApi, 'askGemini').mockResolvedValue({
      candidates: [{ 
        content: { 
          parts: [{ text: "React is a JavaScript library for building user interfaces." }] 
        } 
      }]
    });
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
