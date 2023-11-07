import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Fetch all companies, can filter
  static async getCompanies(data = {}) {
    let res = await this.request("companies", data);
    return res.companies;
  }

  // Get all jobs, can accept search parameters
  static async getJobs(searchFilters = {}) {
    let res = await this.request("jobs", searchFilters);
    return res.jobs;
  }

  // Get job by ID
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  //Apply to a job
  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  //Get user's applications
  static async getUserApplications(username) {
    let res = await this.request(`users/${username}`);
    // Assuming that the jobs array contains the user's applications
    return res.user.jobs;
  }

  // Get current user
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Login user and return a token
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token; //store token
  }

  // Signup user and return token
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token; //store token
  }

  // Update user and return updated user data
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  //Logout the user (clear token)
  static logout() {
    this.token = null;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
