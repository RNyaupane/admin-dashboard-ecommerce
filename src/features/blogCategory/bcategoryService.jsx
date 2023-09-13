import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getBlogCategories= async()=>{
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
}

const BlogCategoryService = {
    getBlogCategories
}

export default BlogCategoryService;