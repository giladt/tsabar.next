/**
 * @jest-environment node
 */

import Inquiry from ".";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { expect, test, beforeEach, afterEach } from "@jest/globals";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

test("renders with or without a name", () => {
  act(() => {
    render(
      <Inquiry apartment={{ id: 1, name: "04" }} bookings={[]} />,
      container
    );
  });
  expect(container.textContent).toBe("Hey, stranger");

  act(() => {
    render(
      <Inquiry apartment={{ id: 1, name: "04" }} bookings={[]} />,
      container
    );
  });
  expect(container.textContent).toBe("Hello, Jenny!");
});
