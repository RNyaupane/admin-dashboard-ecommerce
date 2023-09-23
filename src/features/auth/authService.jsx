import axios from 'axios'
import { base_url } from '../../utils/base_url'
const getUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : ""
const config = {
    headers: {
        'Authorization': `Bearer ${getUser.token}`,
        'Accept': 'application/json'
    }
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/admin-login`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}


const getOrder = async () => {
    const response = await axios.get(`${base_url}user/get-all-orders`, config);
    return response.data;
}

const getOrderByUser = async (id) => {
    const response = await axios.post(`${base_url}user/get-order-by-user/${id}`, "", config);
    return response.data;
}


const authService = {
    login, getOrder, getOrderByUser
}

export default authService;