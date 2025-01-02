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
}


const databaseService = new DatabasesService();
console.log("databaseService", databaseService);
export default databaseService;
