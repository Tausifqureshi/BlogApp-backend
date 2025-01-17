// Appwrite ke Client, Account, ID, Databases, Storage, aur Query classes import karte hain
// Client: Appwrite server se connection banata hai
// Account: Authentication manage karta hai
// ID: Unique IDs generate karne ke liye
// Databases: Database operations perform karta hai (create, update, delete, etc.)
// Storage: Files upload aur manage karta hai
// Query: Query functions ke liye use hota hai
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

// Config file import karte hain jo Appwrite ke endpoint aur project ID rakhta hai
import config from "../config"; // Appwrite server ka URL aur project ID ka configuration import karte hain

// DatabasesService class banate hain jo Appwrite ka database aur storage manage karega
export class DatabasesService {
  // Client object banate hain jo server se baat karega
  client = new Client();

  // Databases aur Storage objects ko yahan define karte hain (initialize constructor me hoga)
  databases;
  storage;

  // Constructor: Jab DatabasesService ka object banta hai, tab ye function chalega
  constructor() {
    // console.log("DatabasesService ka constructor call hua");

    // Client ka endpoint aur project ID set karte hain
    this.client.setEndpoint(config.appwigtUrl).setProject(config.appwriteProjectId);

    // Databases aur Storage objects ko initialize karte hain
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // createPost function: Database me ek nayi document create karta hai
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    // console.log("createPost function call hua");
    try {
      const post = await this.databases.createDocument(
        config.appwriteDatabaseId, // Database ID
        config.appwriteCollectionId, // Collection ID
        slug, // Document ID
        { title, content, featuredImage, status, userId } // Document data
      );
      console.log("post", post);
      return post;
    } catch (error) {
      console.log("appwrite service createPost error::", error);
    }
  }

  // UpdatePost function: Database me ek existing document update karta hai
  async updatePost(slug, { title, content, featuredImage, status }) {
    // console.log("updatePost function call hua");
    try {
      return this.databases.updateDocument(
        config.appwriteDatabaseId, // Database ID
        config.appwriteCollectionId, // Collection ID
        slug, // Document ID
        { title, content, featuredImage, status } // Updated data
      );
    } catch (error) {
      console.log("appwrite service updatePost error::", error);
    }
  }

  // deletePost function: Database me ek existing document delete karta hai
  async deletePost(slug) {
    // console.log("deletePost function call hua");
    try {
      this.databases.deleteDocument(
        config.appwriteDatabaseId, // Database ID
        config.appwriteCollectionId, // Collection ID
        slug // Document ID
      );
      return true;
    } catch (error) {
      console.log("appwrite service deletePost error::", error);
      return false;
    }
  }

  // getPosts function: Database me ek document fetch karta hai
  async getPosts(slug) {
    // console.log("getPosts function call hua");
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId, // Database ID
        config.appwriteCollectionId, // Collection ID
        slug // Document ID
      );
    } catch (error) {
      console.log("appwrite service getPosts error::", error);
      return false;
    }
  }

  // getActiveStatus function: Active status ke documents fetch karta hai
  async getActiveStatus() {
    // console.log("getActiveStatus function call hua");
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId, // Database ID
        config.appwriteCollectionId, // Collection ID
        [Query.equal("status", "active")] // Query
      );
    } catch (error) {
      console.log("appwrite service getActiveStatus error::", error);
    }
  }

  // File Upload Method: Storage ke liye functions

  // uploadFile function: Storage me ek file upload karta hai
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId, // Bucket ID
        ID.unique(), // Unique file ID
        file // File object
      );
    } catch (error) {
      console.log("appwrite service upload file::", error);
      return false;
    }
  }

  // deleteFile function: Storage me ek file delete karta hai
  async deleteFile(fileId) {
    // console.log("deleteFile function call hua");
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite service delete file::", error);
      return false;
    }
  }

  // getFilePreview function: Storage se ek file ka preview fetch karta hai
   getFilePreview(fileId) {
    // console.log("getFilePreview function call hua");
      return  this.storage.getFilePreview(config.appwriteBucketId, fileId);
   
  }

//   getFilePreview(fileId){
//     return this.storage.getFilePreview(
//         config.appwriteBucketId,
//         fileId
//     )
// }


}

// DatabasesService ka ek instance banate hain jo globally use hoga
const databaseService = new DatabasesService();
// console.log("databaseService", databaseService);

// databaseService ko export karte hain taki ise doosri files me use kar sakein
export default databaseService;
















// import config from '../config'
// import { Client, ID, Databases, Storage, Query } from "appwrite";

// export class Service{
//     client = new Client();
//     databases;
//     bucket;
    
//     constructor(){
//         this.client
//         .setEndpoint(config.appwigtUrl)
//         .setProject(config.appwriteProjectId);
//         this.databases = new Databases(this.client);
//         this.bucket = new Storage(this.client);
//     }

//     async createPost({title, slug, content, featuredImage, status, userId}){
//         try {
//             return await this.databases.createDocument(
//                 config.appwriteDatabaseId,
//                 config.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     content,
//                     featuredImage,
//                     status,
//                     userId,
//                 }
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: createPost :: error", error);
//         }
//     }

//     async updatePost(slug, {title, content, featuredImage, status}){
//         try {
//             return await this.databases.updateDocument(
//                 config.appwriteDatabaseId,
//                 config.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     content,
//                     featuredImage,
//                     status,

//                 }
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: updatePost :: error", error);
//         }
//     }

//     async deletePost(slug){
//         try {
//             await this.databases.deleteDocument(
//                 config.appwriteDatabaseId,
//                 config.appwriteCollectionId,
//                 slug
            
//             )
//             return true
//         } catch (error) {
//             console.log("Appwrite serive :: deletePost :: error", error);
//             return false
//         }
//     }

//     async getPost(slug){
//         try {
//             return await this.databases.getDocument(
//                 config.appwriteDatabaseId,
//                 config.appwriteCollectionId,
//                 slug
            
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: getPost :: error", error);
//             return false
//         }
//     }

//     async getPosts(queries = [Query.equal("status", "active")]){
//         try {
//             return await this.databases.listDocuments(
//                 config.appwriteDatabaseId,
//                 config.appwriteCollectionId,
//                 queries,
                

//             )
//         } catch (error) {
//             console.log("Appwrite serive :: getPosts :: error", error);
//             return false
//         }
//     }

//     // file upload service

//     async uploadFile(file){
//         try {
//             return await this.bucket.createFile(
//                 config.appwriteBucketId,
//                 ID.unique(),
//                 file
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: uploadFile :: error", error);
//             return false
//         }
//     }

//     async deleteFile(fileId){
//         try {
//             await this.bucket.deleteFile(
//                 config.appwriteBucketId,
//                 fileId
//             )
//             return true
//         } catch (error) {
//             console.log("Appwrite serive :: deleteFile :: error", error);
//             return false
//         }
//     }

//     getFilePreview(fileId){
//         return this.bucket.getFilePreview(
//             config.appwriteBucketId,
//             fileId
//         )
//     }
// }


// const service = new Service()
// export default service