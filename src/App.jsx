import { useState, useEffect } from "react";
import "./App.css";

import { useDispatch } from "react-redux";
import { login, logout } from "./ReduxStore/authSlice";
import authService from "./appwrite/auth";
import databaseService from "./appwrite/database";
// import { useDispatch } from "react-redux";


function App() {
  const [loding, setLoding] = useState(true);
  // const client = new Client();

  // client
  //   .setEndpoint('https://cloud.appwrite.io/v1') // Setting the endpoint
  //   .setProject('6773e717003577fc5b06'); // Setting the project ID

  // Logging the endpoint and project ID
  // console.log('Endpoint:', client.config.endpoint);
  // console.log('Project ID:', client.config.project)
  //
  // ;
 
  const dispatch = useDispatch();
  
  // console.log(import.meta.env.VITE_APPWRITE_URL, "Appwrite Project URL");
  // console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID, "Appwrite Project ID");

  // console.log( import.meta.env.VITE_APPWRITE_DATABASE_ID, "Appwrite Database ID" );

  // console.log(import.meta.env.VITE_APPWRITE_COLLECTION_ID,"Appwrite Collection ID" );

  // console.log(import.meta.env.VITE_APPWRITE_BUCKET_ID, "Appwrite Bucket ID");

  useEffect(() => {
    console.log("useEffect called");

    authService
      .getCurrentUser()
      .then((userData) => {
        console.log("userData", userData);
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("user data error", error))
      .finally(() => setLoding(false));
  }, []);
 

  return (
    <>
      <h1>Appwrite Client Initialized</h1>
      <p>Check the console for Endpoint and Project ID!</p>
    </>
  )
  return !loding ? (
    <>
      <h1>Appwrite Client Initialized</h1>
      <p>Check the console for Endpoint and Project ID!</p>
    </>
  ) : null;

 
}

export default App;
