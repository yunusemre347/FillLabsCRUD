import React from "react";
import { CustomFetch } from "../../helper/CustomFetch";

export interface props {
  getAllData: () => void;
  button: string;
  setButton: React.Dispatch<React.SetStateAction<string>>;
  ENDPOINT: string;
  row: string | undefined;
  setFirstname: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLastname: React.Dispatch<React.SetStateAction<string | undefined>>;
  firstname: string | undefined;
  lastname: string | undefined;
}
export const FormBox: React.FC<props> = ({
  getAllData,
  button,
  setButton,
  ENDPOINT,
  row,
  setFirstname,
  setLastname,
  firstname,
  lastname,
}) => {
  const description = () => {
    switch (button) {
      case "Delete":
        return "Please select an item to delete";
      case "Create":
        return "Please fill the form to create";
      case "Save":
        return "Please select an item to edit then fill the form";
    }
  };
  //back button onclick func
  const hideForm = () => {
    setButton("Default");
  };
  //action button onclick func
  const selectedAction = (event: React.MouseEvent) => {
    if (button == "Save" && firstname !== undefined && lastname !== undefined) {
      CustomFetch(`${ENDPOINT}update/${row}`, "PUT", { firstname, lastname });
      getAllData();
    }
    if (button == "Delete") {
      CustomFetch(`${ENDPOINT}delete/${row}`, "DELETE");
      getAllData();
    }
    if (
      button == "Create" &&
      firstname !== undefined &&
      lastname !== undefined
    ) {
      CustomFetch(`${ENDPOINT}create`, "POST", { firstname, lastname });
      getAllData();
    }
    event.preventDefault();
  };
  switch (button) {
    case "Default":
      return <></>;
    default:
      return (
        <form className="form">
          <p>{description()}</p>
          {button === "Delete" ? (
            <></>
          ) : (
            <>
              <div>
                <label>First Name </label>
                <input
                  required={button == "Delete" ? false : true}
                  placeholder="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <label> Last Name</label>
                <input
                  required={button == "Delete" ? false : true}
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <button onClick={selectedAction}>{button}</button>
            <button onClick={hideForm}>Back</button>
          </div>
        </form>
      );
  }
};
