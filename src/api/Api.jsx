import axios from 'axios';
// import { data } from 'react-router';

// STEP 1: Create an instance of axios with a base URL
// This allows you to set a default URL for all requests made with this instance
const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

// STEP 2: Create a function to fetch data
// This function uses the axios instance to make a GET request to the '/posts' endpoint
// The fetchData function takes two parameters: start and limit
// start is the starting index of the data to be fetched
// limit is the number of items to be fetched

export const fetchData = async(start , limit)=>{
    try {
       const response = await API.get(`/posts?_start=${start}&_limit=${limit}`);
       return response.status === 200 ? response.data : [];
    } catch (error) {
        console.log(error)
    }
    
}  

// STEP 3: Create a function to fetch data for a specific post
// This function uses the axios instance to make a GET request to the '/posts/:id' endpoint
// where :id is the ID of the post to fetch
export const fetchIndData = async(id)=>{
    try {
        const response = await API.get(`/posts/${id}`);
        return response.status === 200 ? response.data : [];
    } catch (error) {
        console.log(error)
    }
    
}

// STEP 4: Create a function to delete a post
// This function uses the axios instance to make a DELETE request to the '/posts/id' endpoint
// The deleteData function takes one parameter: id, which is the ID of the post to delete
export const deleteData = (id)=>{
    console.log(id)
    return API.delete(`/posts/${id}`); 
}


export const updateData=(id)=>{
    return API.patch(`/posts/${id}`,{title:"updated post", body:"hey i'm updated body"})
}

//infinite scroll


export const getUsersData=async ({pageParam = 1}) => {
    try {
        const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`)
        return  res.data ;
    } catch (error) {
        console.log(error)  
    }
}

