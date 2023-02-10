import { render, screen } from "@testing-library/react";
import UsersGrid from "./UsersGrid";

const props = {
  users: [
    {
      _id: "1",
      firstname: "John",
      lastname: "Doe",
    },
    {
      _id: "2",
      firstname: "Jane",
      lastname: "Doe",
    },
  ],
  button: "Default",
  setRow: jest.fn(),
};

describe("Grid renders correctly", () => {
  test("titles renders correctly", () => {
    render(<UsersGrid {...props} />);
    const firstNameHeader = screen.getByText("First Name");
    expect(firstNameHeader).toBeInTheDocument();
    const lastNameHeader = screen.getByText("Last Name");
    expect(lastNameHeader).toBeInTheDocument();
  });
  test("grid of users renders correctly", () => {
    render(<UsersGrid {...props} />);
    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(props.users.length);
  });
});
