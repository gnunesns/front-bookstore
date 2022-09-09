import axios from "axios";

export const http = axios.create({
    baseURL: 'http://bookstore-apirestful.herokuapp.com/api/v1/'
    
})

