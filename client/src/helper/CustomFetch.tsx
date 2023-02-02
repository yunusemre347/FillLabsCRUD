import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface DataState {
  _id?: string;
  firstname: string;
  lastname: string;
}

const ENDPOINT = "http://localhost:12345/";
const headers = {
  "Content-type": "application/json",
};

export const CustomFetch = async (
  url: string,
  type: string,
  data?: DataState,
  setUsers?: Dispatch<SetStateAction<DataState[]>>
) => {
  switch (type) {
    case "GET":
      if (setUsers) {
        try {
          const response = await axios.get(url);
          setUsers(response.data);
          console.log(`${type} req successful`, response.data);
        } catch (error) {
          console.log(error);
        }
      }
      break;
    case "POST":
      try {
        const response = await axios.post(url, JSON.stringify(data));
        console.log(`${type} req successful`, response.data);
      } catch (error) {
        console.log(error);
      }
      break;
    case "PUT":
      try {
        const response = await axios.put(url, JSON.stringify(data));
        console.log(`${type} req successful`, response.data);
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        const response = await axios.delete(url, { headers });
        console.log(`${type} req successful`, response.data);
      } catch (error) {
        console.log(error);
      }
      break;
  }
};
