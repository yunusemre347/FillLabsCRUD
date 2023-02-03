import "./App.css";
import { useEffect, useState } from "react";
import { CustomFetch } from "./helper/CustomFetch";
import { ButtonBox } from "./components/ButtonBox";
import { FormBox } from "./components/FormBox";
import { UsersGrid } from "./components/UsersGrid";

function App() {
  const [users, setUsers] = useState<DataState[]>([]);
  const [firstname, setFirstname] = useState<string | string>();
  const [lastname, setLastname] = useState<string | string>();
  const [button, setButton] = useState<string | string>("Default");
  const [row, setRow] = useState<string | string>();

  const ENDPOINT = "http://localhost:12345/";

  interface DataState {
    _id?: string;
    firstname: string;
    lastname: string;
  }
  const getAllData = () => {
    CustomFetch(`${ENDPOINT}getAll`, "GET", undefined, setUsers);
  };
  //fetch for first render
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div className="App">
      <ButtonBox setButton={setButton}></ButtonBox>
      <FormBox
        getAllData={getAllData}
        ENDPOINT={ENDPOINT}
        button={button}
        setButton={setButton}
        row={row}
        setFirstname={setFirstname}
        setLastname={setLastname}
        firstname={firstname}
        lastname={lastname}
      ></FormBox>
      <UsersGrid button={button} setRow={setRow} users={users}></UsersGrid>
    </div>
  );
}
export default App;
