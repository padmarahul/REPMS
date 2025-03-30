import  axios from "axios";

const baseUrl = 'http://localhost:8081/repms';
console.log(baseUrl)



const axiosInstance =axios.create({
    baseURL:baseUrl,
})


export default axiosInstance;