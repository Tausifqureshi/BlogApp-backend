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

 // Signup function: User ko signup karne ke liye
 async creatAccount({email, password, name}) {
    console.log("Appwrite Service Signup::");
    try {
      // Account ka signup function call karte hain
      const userAccount = await this.account.create(ID.unique(), email, password, name); 
      if (userAccount) {
      // user ka account banjata hai tu login karne ke liye bjete hai user ko.
        return await this.login({email, password});

      }else {
        return userAccount;
      }
    } catch (error) {
      // Error handle karte hain
      console.log(error);
      throw error;

      // Error return karte hain

    }

  }

  async login({email, password}) {
    try {
    console.log("Appwrite Service Login::");
   return await this.account.createEmailPasswordSession(email, password);      
    } catch (error) {
      
    }
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
