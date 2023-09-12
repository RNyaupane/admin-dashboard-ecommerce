import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../features/customers/CustomerSlice';

const columns = [
    {
        title: 'SN.',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        defaultSortOrder: "descend",
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    
];

const Customers = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    const customerState = useSelector((state) => state.customer.customers);
    //Customer data are in above customerState variable

    const data1 = [];
    for (let i = 0; i < customerState.length; i++) {
        if (customerState[i].role !== 'admin') {
            data1.push({
                key: i,
                name: customerState[i].firstname + " " + customerState[i].lastname,
                email: customerState[i].email,
                mobile: customerState[i].mobile,
            });
        }
    }
    return (
        <>
            <div className="container-fluid px-4">
                <div className="row my-5 mx-3 ">
                    <h3 className="h3 ps-4 my-3 mb-3">Customers</h3>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Customers