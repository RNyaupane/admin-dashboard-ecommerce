import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Button, Table, Modal } from 'antd'; // Import Modal from antd
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAEnquiry, getEnquiry, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import CustomModel from '../components/CustomModel';
import { toast } from 'react-toastify';


const columns = [
  {
    title: 'S.N.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },

];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedMessage, setSelectedMessage] = useState(''); // State for selected message
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState('')

  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState())
    dispatch(getEnquiry());
  }, []);

  const enquiryDataState = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < enquiryDataState.length; i++) {
    data1.push({
      key: i,
      name: enquiryDataState[i].name,
      email: enquiryDataState[i].email,
      mobile: enquiryDataState[i].mobile,
      status: (
        <>
          <select
            name=''
            defaultValue={enquiryDataState[i].status ? enquiryDataState[i].status : 'Submitted'}
            className='form-control form-select w-auto'
            onChange={(e) => setEnqStatus(e.target.value, enquiryDataState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contracted">Contracted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <div className='d-flex '>
          {/* Add an onClick handler to open the modal */}
          <Link className='' onClick={() => handleViewMessage(enquiryDataState[i].comment)}>
            <BsEyeFill className='text-success fs-5' />
          </Link>
          &nbsp;
          <button
            className='ms-2 bg-transparent border-0'
            onClick={() => showModal(enquiryDataState[i]._id)}>
            <AiFillDelete className='text-danger fs-5' />
          </button>
        </div>
      ),
    });
  }

  // Function to handle the opening of the modal
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsModalVisible(true);
  };

  // Function to handle the closing of the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const delEnquiry = (e) => {
    dispatch(deleteAEnquiry(e))
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiry())
    }, 100)
    toast.error('Enquiry deleted!');
  }
  const setEnqStatus = (e, id) => {
    const data = { id: id, enqData: e }
    dispatch(updateAEnquiry(data))
  }


  return (
    <div className="container-fluid px-0 md-px-4">
      <div className="row my-5 mx-0 mx-md-3 ">
        <h3 className="h3 pb-3 ps-3 my-3">Enquiry List</h3>
        <div className="col">
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
          title='Are you sure want to delete this Enquiry?'
          hideModal={hideModal}
          open={open}
          performAction={() => delEnquiry(enquiryId)}
        />
      </div>

      {/* Modal to display the message */}
      <Modal
        title="Enquiry Message"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button className='mt-5' key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <p className='pe-3'>{selectedMessage}</p>
      </Modal>
    </div>
  );
};

export default Enquiries;
