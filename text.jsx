// Import statements: Appwrite's necessary libraries and configurations are imported
// Client: Used to initialize Appwrite connection
// Account: Handles authentication-related tasks
// ID: Generates unique IDs for documents or files
// Databases: Allows database operations (CRUD)
// Storage: Handles file upload, deletion, and retrieval
// Query: Used for querying documents in collections
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import { config } from "./config"; // Importing configuration for Appwrite server URL, project ID, etc.

// DatabasesService class: A utility class to manage database and storage operations
export class DatabasesService {
  Client = new Client(); // Initialize a new Client instance to connect with Appwrite
  databases; // Placeholder for the Databases object
  storage; // Placeholder for the Storage object

  constructor() {
    this.Client.setEndpoint(config.appwigtUrl) // Set the Appwrite server's endpoint
      .setProject(config.appwriteProjectId); // Set the Appwrite project ID
    this.databases = new Databases(this.Client); // Initialize the Databases object with the Client instance
    this.storage = new Storage(this.Client); // Initialize the Storage object with the Client instance
  }

  // createPost function: Creates a new document in the database
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const post = await this.databases.createDocument(
        config.appwriteDatabaseId, // Database ID where the document will be created
        config.appwriteCollectionId, // Collection ID where the document will be added
        slug, // Unique document ID for the post
        {
          title, // Post title
          sulg, // Post slug (note: "sulg" seems to be a typo for "slug")
          content, // Post content
          featuredImage, // URL or ID of the featured image
          status, // Post status (e.g., published, draft)
          userId, // ID of the user who created the post
        }
      );
      return post; // Return the created post
    } catch (error) {
      console.log("appwrite service create post::", error); // Log any error that occurs
      throw error; // Throw the error so it can be handled by the caller
    }
  }

  // updatePost function: Updates an existing document in the database
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId, // Database ID where the document exists
        config.appwriteCollectionId, // Collection ID where the document exists
        slug, // Document ID (slug)
        {
          title, // Updated title
          content, // Updated content
          featuredImage, // Updated featured image
          status, // Updated status
        }
      );
    } catch (error) {
      console.log("appwrite service update post::", error); // Log any error that occurs
      throw error; // Throw the error so it can be handled by the caller
    }
  }

  // deletePost function: Deletes a document from the database
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId, // Database ID
        config.appwriteCollectionId, // Collection ID
        slug // Document ID to be deleted
      );
      return true; // Return true to indicate success
    } catch (error) {
      console.log("appwrite service delete post::", error); // Log any error that occurs
      return false; // Return false to indicate failure
    }
  }

  // getPosts function: Retrieves a specific document from the database
  async getPosts(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId, // Database ID
        config.appwriteCollectionId, // Collection ID
        slug // Document ID to retrieve
      );
    } catch (error) {
      console.log("appwrite service get posts::", error); // Log any error that occurs
      return false; // Return false to indicate failure
    }
  }

  // getActivePosts function: Fetches all documents with "active" status
  async getActivePosts() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId, // Database ID
        config.appwriteCollectionId, // Collection ID
        [Query.equal("status", "active")] // Query to filter documents with "active" status
      );
    } catch (error) {
      console.log("appwrite service get active posts::", error); // Log any error that occurs
      return false; // Return false to indicate failure
    }
  }

  // uploadFile function: Uploads a file to Appwrite's storage
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId, // Bucket ID where the file will be stored
        ID.unique(), // Generate a unique ID for the file
        file // File object to be uploaded
      );
    } catch (error) {
      console.log("appwrite service upload file::", error); // Log any error that occurs
      return false; // Return false to indicate failure
    }
  }

  // deleteFile function: Deletes a file from Appwrite's storage
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        config.appwriteBucketId, // Bucket ID
        fileId // File ID to delete
      );
      return true; // Return true to indicate success
    } catch (error) {
      console.log("appwrite service delete file::", error); // Log any error that occurs
      return false; // Return false to indicate failure
    }
  }

  // getFilePreview function: Fetches a preview of a file from Appwrite's storage
  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(
        config.appwriteBucketId, // Bucket ID
        fileId // File ID to fetch preview for
      );
    } catch (error) {
      console.log("appwrite service get file preview::", error); // Log any error that occurs
      return false; // Return false to indicate failure
    }
  }
}

// Instantiate the DatabasesService class to create a reusable object
const databases = new DatabasesService();

// Export the instance to use in other parts of the application
export default databases;
