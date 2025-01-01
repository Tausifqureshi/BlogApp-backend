import { Client } from 'appwrite';
import './App.css';

function App() {
  // const client = new Client();

  // client
  //   .setEndpoint('https://cloud.appwrite.io/v1') // Setting the endpoint
  //   .setProject('6773e717003577fc5b06'); // Setting the project ID

// Logging the endpoint and project ID
  // console.log('Endpoint:', client.config.endpoint);
  // console.log('Project ID:', client.config.project)
  // 
  // ;

  
  console.log(import.meta.env.VITE_APPWRITE_URL, "Appwrite Project URL"); 
  console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID, "Appwrite Project ID");   

  console.log(import.meta.env.VITE_APPWRITE_DATABASE_ID, "Appwrite Database ID");   

  console.log(import.meta.env.VITE_APPWRITE_COLLECTION_ID, "Appwrite Collection ID"); 

  console.log(import.meta.env.VITE_APPWRITE_BUCKET_ID, "Appwrite Bucket ID");   
  
  

  

  return (
    <>
      <h1>Appwrite Client Initialized</h1>
      <p>Check the console for Endpoint and Project ID!</p>
    </>
  );
}

export default App;
