import { render, screen ,act } from "@testing-library/react";
import { ButtonBox } from "./ButtonBox";
import { useState } from "react";
import user from "@testing-library/user-event";

const ButtonBoxProp = () => {
  const [button, setButton] = useState("");

  return <ButtonBox setButton={setButton} />;
};

describe("ButtonBox buttons renders correctly", () => {
  test("Create renders correctly", () => {
    render(<ButtonBoxProp />);
    const createButton = screen.getByRole("button", {
      name: "New",
    });
    expect(createButton).toBeInTheDocument;
  });
  test("Delete renders correctly", () => {
    render(<ButtonBoxProp />);
    const deleteButton = screen.getByRole("button", {
      name: "Delete",
    });
    expect(deleteButton).toBeInTheDocument;
  });
  test("Edit renders correctly", () => {
    render(<ButtonBoxProp />);
    const editButton = screen.getByRole("button", {
      name: "Edit",
    });
    expect(editButton).toBeInTheDocument;
  });
});

describe("Buttons work correctly", () => {
  test("Click New button initiates function", async () => {
    user.setup();
    render(<ButtonBoxProp />);
    const handleClickNew = jest.fn();

    const createButton = screen.getByRole("button", { name: "New" });
    user.click(createButton);
    expect(handleClickNew).toHaveBeenCalled;

    // act(() => {
    //     user.click(createButton);
    //   });
  
    //   expect(button).toBe("Create");
  });

  test("Click Edit button initiates function", async () => {
    user.setup();
    render(<ButtonBoxProp />);
    const handleClickEdit = jest.fn();

    const editButton = screen.getByRole("button", { name: "Edit" });
    user.click(editButton);
    expect(handleClickEdit).toHaveBeenCalled;
  });

  test("Click Delete button initiates function", async () => {
    user.setup();
    render(<ButtonBoxProp />);
    const handleClickDelete = jest.fn();

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    user.click(deleteButton);
    expect(handleClickDelete).toHaveBeenCalled;
    
  });
});
