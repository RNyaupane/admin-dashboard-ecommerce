import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosConfig';

const getEnquiry = async () => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
}

const deleteAEnquiry = async (id) => {
    const response = await axios.delete(`${base_url}enquiry/${id}`, config);
    return response.data;
}

const getAEnquiry = async (id) => {
    const response = await axios.get(`${base_url}enquiry/${id}`);
    return response.data;
}

const updateAEnquiry = async (enq) => {
    const response = await axios.put(`${base_url}enquiry/${enq.id}`,{status:enq.enqData}, config);
    return response.data;
}



const EnquiryService = {
    getEnquiry,
    deleteAEnquiry,
    getAEnquiry,
    updateAEnquiry

}

export default EnquiryService;