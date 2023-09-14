import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
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
        const createdAt = new Date(orderDataState[i].createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1; // Months are 0-based, so add 1
        const day = createdAt.getDate();
        const formattedDate = `${year}-${month}-${day}`;

        data1.push({
            key: i+1,
            name: orderDataState[i].orderby.firstname + " " + orderDataState[i].orderby.lastname,
            product: orderDataState[i].products.map((i,j) => {
                return <p key={j}>{i.product.title}</p>;
            }), 
            amount: orderDataState[i].paymentIntent.amount,
            status: orderDataState[i].orderStatus,
            date: formattedDate,
            action:
                <div className='d-flex'>
                    <Link className=''><BiEdit className='text-info fs-5' /></Link>&nbsp;
                    <Link className='ms-2'><AiFillDelete className='text-danger fs-5' /></Link>
                </div>
        });
    }
    return (
        <>
            <div className="container-fluid px-0 px-md-2">
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