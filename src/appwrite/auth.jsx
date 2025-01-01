import config from "../config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint() // Appwrite server ka URL
      .setProject(); // Project ID set karte hain
    this.account = new Account(this.client);
  }
}

const authService = new AuthService();
export default authService;
