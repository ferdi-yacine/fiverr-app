import axios from "axios";

const newRequest = axios.create({
    baseURL: "YOUR_API_SERVER",
    withCredentials: true
});

export default newRequest;