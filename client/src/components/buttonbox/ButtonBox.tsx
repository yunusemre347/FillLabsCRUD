import React from "react";

interface props {
  setButton: React.Dispatch<React.SetStateAction<string>>;
}

export const ButtonBox: React.FC<props> = ({ setButton }) => {
  //Action button state functions.
  const handleClickNew = () => {
    setButton("Create");
  };
  const handleClickEdit = () => {
    setButton("Save");
  };
  const handleClickDelete = () => {
    setButton("Delete");
  };
  return (
    <div>
      <div className="button-box">
        <button onClick={handleClickNew}>New</button>
        <button onClick={handleClickEdit}>Edit</button>
        <button onClick={handleClickDelete}>Delete</button>
      </div>
    </div>
  );
};
