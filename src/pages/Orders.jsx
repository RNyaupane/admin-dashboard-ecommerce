import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../features/auth/authSlice'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'


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
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

const Orders = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const orderDataState = useSelector((state) => state.auth.orders)
    const data1 = [];
    for (let i = 0; i < orderDataState.length; i++) {
        data1.push({
            key: i,
            name: orderDataState[i].title,
            action:
                <div className='d-flex'>
                    <Link className=''><BiEdit className='text-info fs-5' /></Link>&nbsp;
                    <Link className='ms-2'><AiFillDelete className='text-danger fs-5' /></Link>
                </div>
        });
    }
    return (
        <>
            <div className="container-fluid px-0 px-md-4">
                <div className="row my-5 mx-0 mx-md-3 ">
                    <h3 className="h3 mb-3 ps-4 my-3">Orders</h3>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders