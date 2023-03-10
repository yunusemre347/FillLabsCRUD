import React, { memo } from "react";
import SingleUser from "../singleuser/SingleUser";

interface DataState {
  _id?: string;
  firstname: string;
  lastname: string;
}
interface props {
  users: DataState[];
  button: string;
  setRow: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UsersGrid: React.FC<props> = ({ users, button, setRow }) => {
  const getID = (ident: string) => {
    setRow(ident);
  };
  return (
    <div>
      <div className="title">
        <div>First Name</div>
        <div>Last Name</div>
      </div>
      <ul>
        {users?.map((users: DataState) => (
          <li key={users._id}>
            <SingleUser user={users} getID={getID} button={button} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(UsersGrid);
