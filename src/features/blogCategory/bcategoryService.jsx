import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosConfig';

const getBlogCategories= async()=>{
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
}
const createBlogCategory = async (blog) => {
    const response = await axios.post(`${base_url}blogcategory/`, blog, config);
    return response.data;
};

const BlogCategoryService = {
    getBlogCategories,
    createBlogCategory
}

export default BlogCategoryService;