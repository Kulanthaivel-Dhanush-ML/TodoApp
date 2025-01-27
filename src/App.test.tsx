import { render, screen } from "@testing-library/react";
import App from "./App";

test("Title of the Display page", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Your To-Do List: Turning Plans into Actions/i,
  );
  expect(linkElement).toBeInTheDocument();
});
