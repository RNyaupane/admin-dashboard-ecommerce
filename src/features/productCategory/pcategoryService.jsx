import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getProductCategories = async()=>{
    const response = await axios.get(`${base_url}productcategory/`);
    return response.data;
}

const ProductCategoryService = {
    getProductCategories
}

export default ProductCategoryService;