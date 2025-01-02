import {Client, Account, ID, Databases, Storage, Query } from "appwrite";
import  config  from "../config"; // Importing configuration for Appwrite server URL, project ID, etc.


export class DatabasesService {
    client = new Client();
    databases;
    storage;

    constructor(){
        console.log("DatabasesService constructor called");
        this.client
            .setEndpoint(config.appwigtUrl) // Appwrite server ka URL
            .setProject(config.appwriteProjectId); // Project ID set karte hain

            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);

    }

  //createPost function: Creates a new document in the database
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    console.log("createPost called");
      try {
        const post =  await this.databases.createDocument(
            title,
            slug,
            content,
            featuredImage,
            status,
            userId
        )
        
      } catch (error) {
        console.log("appwrite service create post::", error);
        
      }
  }


}


const databaseService = new DatabasesService();
console.log("databaseService", databaseService);
export default databaseService;
