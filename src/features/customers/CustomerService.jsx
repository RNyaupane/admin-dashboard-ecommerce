import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getUsers = async()=>{
    const response = await axios.get(`${base_url}user/all-users`);
    return response.data;
}

const CustomerService = {
    getUsers
}

export default CustomerService;