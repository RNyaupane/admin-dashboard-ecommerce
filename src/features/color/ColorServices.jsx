import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosConfig';

const getColors = async()=>{
    const response = await axios.get(`${base_url}color/`);
    return response.data;
}

const createColor = async (color) => {
    const response = await axios.post(`${base_url}color/`, color, config);
    return response.data;
};

const ColorService = {
    getColors,
    createColor
}

export default ColorService;