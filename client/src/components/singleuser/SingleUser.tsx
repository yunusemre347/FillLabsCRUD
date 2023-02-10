import {memo} from "react"
type GetIDFunction = (id: string) => void;

interface UserState {
  _id?: string;
  firstname: string;
  lastname: string;
}
type SingleUserProps = {
  user: UserState;
  getID: GetIDFunction;
  button: string;
};

 const SingleUser =  ({ user, getID, button }: SingleUserProps) => {
  const ident: string | undefined = user?._id;
  return (
    <div className="single-user" data-testid="single-user" key={user._id}>
      <div>
        <span>&nbsp; {user?.firstname}</span>
      </div>
      <div>
        <span> &nbsp;{user?.lastname}</span>
      </div>
      {button === "Default"||button === "Create" ? (
        <></>
      ) : (
        <input
          type={"radio"}
          onChange={() => (ident ? getID(ident) : "")}
          name={"1"}
        ></input>
      )}
    </div>
  );
};

export default memo(SingleUser)