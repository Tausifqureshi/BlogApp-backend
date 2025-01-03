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
  async creatAccount({ email, password, name }) {
    console.log("Appwrite Service Signup::");
    try {
      const userAccount = await this.account.create(ID, email, password, name);
      if (userAccount) {
        // other function called
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite Service Signup::", error);
      throw error;
    }
  }

  //   Login function: User ko login karne ke liye
  async login({ email, password }) {
    console.log("Appwrite Service Login::");
    try {
      return await this.account.createEmailPasswordSession(email, password);
      //  return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite Service Login::", error);
      throw error;
    }
  }

  // Logout function: User ko logout karne ke liye
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service Logout::", error);
    }

    return null;
  }

  // createCurrentUser function: Current user ko fetch karne ke liye
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service Current User::", error);
      throw error;
    }
  }
}

const authService = new AuthService();
console.log("authService", authService);
export default authService;
