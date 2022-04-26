/* eslint-disable react/prop-types */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";

const ReduxWrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

test("renders heading", () => {
  render(
    <ReduxWrapper>
      <App />
    </ReduxWrapper>
  );
  const h1Element = screen.getByText(/Repository search/i);
  expect(h1Element).toBeInTheDocument();
});
