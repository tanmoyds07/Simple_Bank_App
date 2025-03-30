import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
    baseURL: 'http://localhost:3001', // Replace with your API base URL
    timeout: 10000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle GET requests
const getData = async (endpoint, params = {}) => {
    try {
        const response = await api.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error('GET request error:', error);
        throw error;
    }
};

// Function to handle POST requests
const postData = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('POST request error:', error);
        throw error;
    }
};

// Function to handle PUT requests
const putData = async (endpoint, data) => {
    try {
        const response = await api.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('PUT request error:', error);
        throw error;
    }
};

export {
    getData, 
    postData, 
    putData
};
