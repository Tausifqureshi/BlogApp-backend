import config from "../config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    console.log("AuthService constructor called");
    this.client
      .setEndpoint(config.appwigtUrl) // Appwrite server ka URL
      .setProject(config.appwriteProjectId); // Project ID set karte hain
    this.account = new Account(this.client);
    console.log("AuthService initialized with client and account");
  }


  
  async getCurrentUser() {
    try {
     // Current user ko fetch karega
     return await this.account.get();
    } catch (error) {
     console.log("Appwrite Service Current User::",error);
     throw error;
    }
 
   //  return null; 
   }
}

const authService = new AuthService();
export default authService;
