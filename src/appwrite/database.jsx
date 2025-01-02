import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import config from "../config"; // Appwrite server ka URL aur project ID ka configuration import kar rahe hain.

export class DatabasesService {
  client = new Client();
  databases;
  storage;

  constructor() {
    console.log("DatabasesService ka constructor call hua");
    this.client
      .setEndpoint(config.appwigtUrl) // Appwrite server ka URL set karte hain
      .setProject(config.appwriteProjectId); // Project ID set karte hain

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // createPost function: Database me ek nayi document create karta hai
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    console.log("createPost function call hua");
    try {
      const post = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      console.log("post", post);
      return post;
    } catch (error) {
      console.log("appwrite service createPost error::", error);
    }
  }

  // UpdatePost function: Database me ek existing document update karta hai
  async updatePost(slug, { title, content, featuredImage, status }) {
    console.log("updatePost function call hua");
    try {
      return this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite service updatePost error::", error);
    }
  }

  // DeltePost function: Database me ek existing document delete karta hai.
  async deletePost(slug) {
    console.log("deletePost function call hua");
    try {
      this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite service deletePost error::", error);
      return false;
    }
  }

  // getPosts function: Database me ek existing document fetch karta hai.
  async getPosts (slug){
    try {
       return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
        )
        
    } catch (error) {
        console.log("appwrite service getPosts error::", error);
        return false;  
    }
  }


  



}

const databaseService = new DatabasesService();
console.log("databaseService", databaseService);
export default databaseService;
