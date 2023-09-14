import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getOrder= async()=>{
    const response = await axios.get(`${base_url}user/get-orders`);
    return response.data;
}

const OrderService = {
    getOrder
}

export default OrderService;