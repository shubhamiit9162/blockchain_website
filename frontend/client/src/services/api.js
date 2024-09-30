// API service file
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/users/register`, userData);
};

export const getUserProfile = async (token) => {
    return await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: token }
    });
};

export const createEvent = async (eventData) => {
    return await axios.post(`${API_URL}/events`, eventData);
};

export const getEvents = async () => {
    return await axios.get(`${API_URL}/events`);
};
