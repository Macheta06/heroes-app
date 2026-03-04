import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock("../ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[],
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>,
  );
};

describe("CustomPagination", () => {
  test("should render component with default value", () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    expect(screen.getByText("Anteriores")).toBeDefined();
    expect(screen.getByText("Siguientes")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
  });

  test("Should disable previous buttons when page is 1", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>);

    const previousButton = screen.getByText("Anteriores");
    expect(previousButton.getAttributeNames()).toContain("disabled");
  });

  test("Should disable next buttons when we are in the last page", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>, [
      "/?page=5",
    ]);

    const nextButton = screen.getByText("Siguientes");
    expect(nextButton.getAttributeNames()).toContain("disabled");
  });

  test("Should disable button 3 when we are in page 3", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>, [
      "/?page=3",
    ]);

    const button3 = screen.getByText("3");
    expect(button3.getAttribute("variant")).toContain("default");
  });

  test("should change page when click on number button", () => {
    renderWithRouter(<CustomPagination totalPages={5}></CustomPagination>, [
      "/?page=3",
    ]);
    const button2 = screen.getByText("2");
    expect(button2.getAttribute("variant")).toContain("outline");
    fireEvent.click(button2);
    expect(button2.getAttribute("variant")).toContain("default");
  });
});
