import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosConfig';

const getProductCategories = async () => {
    const response = await axios.get(`${base_url}productcategory/`);
    return response.data;
}
const createProductCategory = async (category) => {
    const response = await axios.post(`${base_url}productcategory/`, category, config);
    return response.data;
};
const updateProductCategory = async (category) => {
    console.log(category);
    const response = await axios.put(`${base_url}productcategory/${category.id}`, { title: category.pCategoryData.title }, config);
    return response.data;
};

const getProductCategory = async (id) => {
    const response = await axios.get(`${base_url}productcategory/${id}`, config);
    return response.data;
};

const deleteProductCategory = async (id) => {
    const response = await axios.delete(`${base_url}productcategory/${id}`, config);
    return response.data;
};

const ProductCategoryService = {
    getProductCategories,
    createProductCategory,
    updateProductCategory,
    getProductCategory,
    deleteProductCategory,
}

export default ProductCategoryService;