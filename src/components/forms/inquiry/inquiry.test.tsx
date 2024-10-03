import { render, screen } from "@testing-library/react";

import Inquiry from ".";

describe("Inquiry", () => {
  render(<Inquiry apartment={{ id: 4, name: "Le-Soleil" }} bookings={[]} />);
  const form = screen.getByTestId("inquiry-form");

  it("renders an inquiry form", () => {
    expect(form).toBeInTheDocument();
  });
});
