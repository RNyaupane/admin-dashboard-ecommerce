import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBrands } from '../features/brand/BrandSlice'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'


const columns = [
    {
        title: 'S.N.',
        dataIndex: 'key',
    },
    {
        title: 'Brand Name',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const BrandList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBrands())
    }, [])
    const brandState = useSelector((state) => state.brand.brands)
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            name: brandState[i].title,
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
                        <h3 className="fs-3 ps-2 my-3">Brands</h3>
                        <Link to="/admin/add-brand" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1' /> Add Brand
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

export default BrandList