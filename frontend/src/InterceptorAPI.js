// api.js
import axios from "axios";
import Cookies from "js-cookie";

// Create a custom Axios instance
const api = axios.create({});

// Set default headers (e.g., 'Authorization' header for authentication)
api.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("token")}`; 

export default api; 
