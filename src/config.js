const config = {
    appwigtUrl: String(import.meta.env.VITE_APPWRITE_URL),
    // VITE_APPWRITE_URL
  
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    // VITE_APPWRITE_PROJECT_ID

    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    // VITE_APPWRITE_DATABASE_ID
  
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    // VITE_APPWRITE_COLLECTION_ID
  
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    // VITE_APPWRITE_BUCKET_ID
  };
  
  // Log each environment variable
  console.log("Appwrite URL:", config.appwigtUrl);
  console.log("Appwrite Project ID:", config.appwriteProjectId);
  console.log("Appwrite Database ID:", config.appwriteDatabaseId);
  console.log("Appwrite Collection ID:", config.appwriteCollectionId);
  console.log("Appwrite Bucket ID:", config.appwriteBucketId);

  export default config;