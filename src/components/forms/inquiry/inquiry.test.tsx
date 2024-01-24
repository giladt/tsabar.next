import { render, screen } from "@testing-library/react";

import Inquiry from ".";
import { DateRange } from "react-date-range";

describe("Inquiry", () => {
  render(<Inquiry apartment={{ id: 4, name: "Le-Soleil" }} bookings={[]} />);
  const form = screen.getByTestId("inquiry-form");

  it("renders an inquiry form", () => {
    expect(form).toBeInTheDocument();
  });
});
