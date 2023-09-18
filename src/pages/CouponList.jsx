import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { getCoupons } from '../features/coupon/CouponSlice';


const columns = [
    {
        title: 'S.N.',
        dataIndex: 'key',
    },
    {
        title: 'Coupon Name',
        dataIndex: 'name',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
    },
    {
        title: 'Expried at',
        dataIndex: 'expiry',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const CouponList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCoupons())
    }, [])
    const couponState = useSelector((state) => state.coupon.coupons)
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        const expiryDate = new Date(couponState[i].expiry);
        const year = expiryDate.getFullYear();
        const month = expiryDate.getMonth() + 1; // Months are 0-based, so add 1
        const day = expiryDate.getDate();
        const formattedDate = `${year}-${month}-${day}`;
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            discount:couponState[i].discount,
            expiry:formattedDate,
            action:
                <div className='d-flex'>
                    <Link className=''><BiEdit className='text-info fs-5' /></Link>&nbsp;
                    <Link className='ms-2'><AiFillDelete className='text-danger fs-5' /></Link>
                </div>
        });
    }
    return (
        <>
            <div className="container-fluid px-0 md-px-4">
                <div className="row my-5 mx-0 mx-md-3 ">
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3 className="fs-3 ps-2 my-3">Coupons</h3>
                        <Link to="/admin/add-coupon" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1' /> Add Coupons
                        </Link>
                    </div>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CouponList