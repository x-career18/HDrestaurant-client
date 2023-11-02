import axios from "axios";

const instance = axios.create({
    baseURL: "https://hd-restaurant-be.onrender.com/",
});

instance.interceptors.request.use(

);

export default instance;