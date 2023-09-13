import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { getProductCategories } from '../features/productCategory/pcategorySlice';


const columns = [
    {
        title: 'S.N.',
        dataIndex: 'key',
    },
    {
        title: 'Categories',
        dataIndex: 'title',
    },
    {
        title: 'Created Date',
        dataIndex: 'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const ProductCatList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductCategories())
    }, [])

    const pcategoriesState = useSelector((state) => state.productCategories.productCategories)
    console.log(pcategoriesState)
    const data1 = [];

    for (let i = 0; i < pcategoriesState.length; i++) {
        const createdAt = new Date(pcategoriesState[i].createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1; // Months are 0-based, so add 1
        const day = createdAt.getDate();

        const formattedDate = `${year}-${month}-${day}`;
        data1.push({
            key: i + 1,
            title: pcategoriesState[i].title,
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
            <div className="container-fluid px-4">
                <div className="row my-5 mx-3 ">
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3 className="fs-3 ps-2 my-3">Product Categories</h3>
                        <Link to="/admin/add-product-category" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1' /> Add Category
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

export default ProductCatList