import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { SingleUser } from './SingleUser';

const ENDPOINT = "http://localhost:12345/"
//const ENDPOINT = "https://randomuser.me/api/?results=5"
interface DataState {
  _id?: string
  firstname: string;
  lastname: string;
}
function App() {
  const [users, setUsers] = useState<DataState[]>([])
  const [firstname, setFirstname] = useState<string | string>()
  const [lastname, setLastname] = useState<string | string>()
  const [button, setButton] = useState<string | string>("Create")
  const [row, setRow] = useState<string | string>()
  const [visibility, setVisibility] = useState<string | string>("none")

  //custom fetch for all request for practicality
  const customfetch = useCallback(async (url: string, type: string, data?: DataState) => {
    if (type === "DELETE") {
      await fetch(url, {
        method: type,
        headers: {
          'Content-type': 'application/json'
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("http req successfull");
          } else {
            console.log("http req unsuccsessfull")
          }
        })

        // .then(response => response.json())
        .then(data => {
          console.log("http req successfull");
        })
        .catch((error) => console.log(error))
    }
    if (type === "GET") {
      await fetch(url,
        {
          method: type,
        })
        .then((res) => {
          if (res.ok) {
            console.log("http req successfull");
          } else {
            console.log("http req unsuccsessfull")
          }
          return res;
        }
        )
        .then((res) => res.json())
        .then(data => {
          setUsers(data) //state for grid
        })
        .catch((error) => console.log(error))
    }
    if (type === "POST") {
      await fetch(url, {
        method: type,
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            console.log("http req successfull");
          } else {
            console.log("http req unsuccsessfull")
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    }
    if (type == "PUT") {
      await fetch(url, {
        method: type,
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            console.log("http req successfull");
          } else {
            console.log("http req unsuccsessfull")
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    }
  }, [])
  //fetch for first render
  useEffect(() => {
    customfetch(`${ENDPOINT}getAll`, "GET")
    console.log(users)
  }, [users])

  //Action button state functions.
  const handleClickNew = () => {
    setButton("Create")
    setVisibility("block")
  }
  const handleClickEdit = () => {
    setButton("Save")
    setVisibility("block")
  }
  const handleClickDelete = () => {
    setButton("Delete")
    setVisibility("block")
  }
  //fetch actions for each button
  const selectedAction = (event: React.SyntheticEvent) => {//I will set a better event type in future

    if (button == "Save" && firstname !== undefined && lastname !== undefined) {
      (customfetch(`${ENDPOINT}update/${row}`, "PUT", { firstname, lastname }))
    }
    if (button == "Delete") {
      (customfetch(`${ENDPOINT}delete/${row}`, "DELETE"))
    }
    if (button == "Create" && firstname !== undefined && lastname !== undefined) {
      (customfetch(`${ENDPOINT}create`, "POST", { firstname, lastname }))
    }
    event.preventDefault();
  }
  //to get id from items
  const getID = (ident: string) => {
    setRow(ident)
  }
  const hideForm = () => {
    setVisibility("none")
    setButton("Create")
  }

  return (
    <div className="App">
      <div>
        <div className='button-box'>
          <button onClick={handleClickNew}>New</button>
          <button onClick={handleClickEdit}>Edit</button>
          <button onClick={handleClickDelete}>Delete</button>
        </div>
        <form className='form' style={{ display: `${visibility}` }} >
          <p style={button == "Delete" ? { display: "flex" } : { display: "none" }}>Please select an item to delete </p>
          <p style={button == "Save" ? { display: "flex" } : { display: "none" }}>Please select an item to edit then fill the form</p>
          <p style={button == "Create" ? { display: "flex" } : { display: "none" }}>Please fill the form to create</p>
          <div style={button == "Delete" ? { display: "none" } : { display: "flex" }} >
            <label>First Name </label>
            <input required={button == "Delete" ? false : true} placeholder='First Name' onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div style={button == "Delete" ? { display: "none" } : { display: "flex" }} >
            <label> Last Name</label>
            <input required={button == "Delete" ? false : true} placeholder='Last Name' onChange={(e) => setLastname(e.target.value)} />
          </div>
          <div>
            <button onClick={selectedAction}>{button}</button>
            <button onClick={hideForm}>Back</button>
          </div>
        </form>
        <div className='title'><div>First Name</div><div>Last Name</div></div>
        <ul>
          {users?.map((users: DataState) => (
            <li key={users._id}> <SingleUser user={users} getID={getID} button={button} /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
