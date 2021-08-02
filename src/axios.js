import axios from "axios";
const instance = axios.create({
  baseURL: "https://us-central1-fitness-deliverer-c88c7.cloudfunctions.net/api",
  // "http://localhost:5001/fitness-deliverer-c88c7/us-central1/api", //the api (cloud function) URL
});
export default instance;
