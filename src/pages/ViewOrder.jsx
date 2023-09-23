import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getOrderByUser, getOrders } from '../features/auth/authSlice'
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
        title: 'Count',
        dataIndex: 'count',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
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

const ViewOrder = () => {

    const dispatch = useDispatch();
    const location = useLocation()

    const userid = location.pathname.split('/')[3];

    useEffect(() => {
        dispatch(getOrderByUser(userid))
    }, [])

    const orderDataState = useSelector((state) => state.auth.orderByUser.products)
    const orderByUserName = useSelector((state) => state.auth.orderByUser.orderby)

    const data1 = [];
    for (let i = 0; i < orderDataState.length; i++) {
        const createdAt = new Date(orderDataState[i].product.createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1; // Months are 0-based, so add 1
        const day = createdAt.getDate();
        const formattedDate = `${year}-${month}-${day}`;

        data1.push({
            key: i + 1,
            name: orderDataState[i].product.title,
            count: orderDataState[i].count,
            amount: orderDataState[i].product.price,
            color: orderDataState[i].product.color,
            brand: orderDataState[i].product.brand,
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
                    <div className='d-flex align-items-center justify-content-between'>
                        <h3 className="h3 mb-3 ps-4 my-3">Orders by- <span className='text-capitalize text-secondary'>({orderByUserName.firstname + " " + orderByUserName.lastname})</span></h3>
                        <Link to='/admin/orders' className='text-decoration-none text-secondary border px-2 border-secondary cursor-pointer'>Go Back</Link>
                    </div>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewOrder