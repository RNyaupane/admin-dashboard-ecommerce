import React, { useEffect, useState } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { deleteProductCategory, getProductCategories, resetState } from '../features/productCategory/pcategorySlice';
import CustomModel from '../components/CustomModel';
import { toast } from 'react-toastify';



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

    const [open, setOpen] = useState(false);
    const [pCatId, setpCatId] = useState('')

    const showModal = (e) => {
        setOpen(true);
        setpCatId(e)
    };
    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(resetState())
        dispatch(getProductCategories())
    }, [])



    const pcategoriesState = useSelector((state) => state.productCategory.productCategories)
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
                    <Link to={`/admin/add-product-category/${pcategoriesState[i]._id}`}>
                        <BiEdit className='text-info fs-5' /></Link>&nbsp;
                    <button
                        className='ms-2 bg-transparent border-0'
                        onClick={() => showModal(pcategoriesState[i]._id)}>
                        <AiFillDelete className='text-danger fs-5' />
                    </button>
                </div>
        });
    }
    const delProductCategory = (e) => {
        dispatch(deleteProductCategory(e))
        setOpen(false);
        setTimeout(() => {
            dispatch(getProductCategories())
        }, 100)
        toast.error('Product deleted successfully!');
    }
    return (
        <>
            <div className="container-fluid px-0 px-md-4">
                <div className="row my-5 mx-0 mx-md-3 ">
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3 className="fs-3 ps-2 my-3">Product Categories</h3>
                        <Link to="/admin/add-product-category" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1' /> Add Category
                        </Link>
                    </div>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                    <CustomModel
                        title='Are you sure want to delete this product category?'
                        hideModal={hideModal}
                        open={open}
                        performAction={() => delProductCategory(pCatId)}
                    />
                </div>
            </div>
        </>
    )
}

export default ProductCatList