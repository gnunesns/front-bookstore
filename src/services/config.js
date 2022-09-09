import axios from "axios";

export const http = axios.create({
    baseURL: 'https://bookstore-apirestful.herokuapp.com/api/v1/'
    
})

