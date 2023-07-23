import Login from "../src/app/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppRouterContextProviderMock } from "./app-router-context-provider-mock";
import dotenv from "dotenv";

dotenv.config();

describe("Login Page", () => {
  it("renders login modal", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <Login />
      </AppRouterContextProviderMock>
    );
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
  });
});
