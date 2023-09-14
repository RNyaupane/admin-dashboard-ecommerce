import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Button, Table, Modal } from 'antd'; // Import Modal from antd
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEnquiry } from '../features/enquiry/enquirySlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';

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

  useEffect(() => {
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
          <select name='' className='form-control form-select w-auto'>
            <option value="">Set Status</option>
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
          <Link className='ms-2'><AiFillDelete className='text-danger fs-5 mx-0 mx-md-2' /></Link>
          <Link className='ms-2'><BiEdit className='text-info fs-5' /></Link>
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

  return (
    <div className="container-fluid px-0 md-px-4">
      <div className="row my-5 mx-0 mx-md-3 ">
        <h3 className="h3 pb-3 ps-3 my-3">Enquiry List</h3>
        <div className="col">
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      
      {/* Modal to display the message */}
      <Modal
        title="Message"
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
