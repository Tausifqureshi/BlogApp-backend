export class AuthService {
    // Client object banate hain jo server se baat karega
    client = new Client();
  
    // Account object ko yahan define karte hain (initialize constructor me hoga)
    account;
  
    // Constructor: Jab AuthService ka object banta hai, tab ye function chalega
    constructor() {
      // console.log("AuthService constructor called");
      // Client ka endpoint set karte hain (yahan server ka URL set hota hai)
      this.client
        .setEndpoint(config.appwigtUrl) // Appwrite server ka URL
        .setProject(config.appwriteProjectId); // Project ID set karte hain
  
      // Account object ko initialize karte hain jo authentication ka kaam karega
      this.account = new Account(this.client);
      // console.log("AuthService initialized with client and account");
    }
  
  
    // Signup function: User ko signup karne ke liye
    async creatAccount({email, password, name}) {
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
  
  
    // Login function: User ko login karne ke liye
    async login({email, password}) {
      try {
     return await this.account.createEmailPasswordSession(email, password);      
      } catch (error) {
        
      }
    }
    
  
    // Logout function: User ko logout karne ke liye
    async logout() {
      try {
        // Account ka logout function call karte hain
        // Current session ko delete karte hain
       return await this.account.deleteSessions();
      } catch (error) {
        // Error handle karte hain
        console.log("Appwrite Service Logout::",error);
        throw error;
      }
    }
  
  
    // createCurrentUser function: Current user ko fetch karne ke liye
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
  
  // AuthService ka ek instance banate hain jo globally use hoga
  const authService = new AuthService();
  
  // authService ko export karte hain taki ise doosri files me use kar sakein
  export default authService;
  