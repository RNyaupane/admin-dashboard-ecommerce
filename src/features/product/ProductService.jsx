import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosConfig';

const getProducts = async()=>{
    const response = await axios.get(`${base_url}product/`);
    return response.data;
}
const createProduct = async (product) => {
    const response = await axios.post(`${base_url}product/`, product, config);
    return response.data;
  };

const ProductService = {
    getProducts,
    createProduct
}

export default ProductService;