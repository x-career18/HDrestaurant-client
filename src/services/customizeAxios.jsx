import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000",
});

instance.interceptors.request.use(

);

export default instance;