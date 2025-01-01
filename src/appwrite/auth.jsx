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
     const userAccount = await this.account.create(ID,email,password,name)
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
