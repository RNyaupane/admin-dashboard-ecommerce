import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../features/product/ProductSlice';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'


const columns = [
    {
        title: 'S.N.',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.length - b.brand.length,

    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,

    },
    {
        title: 'Action',
        dataIndex: 'action',
    },

];

const Products = () => {
    const disptach = useDispatch();
    useEffect(() => {
        disptach(getProducts());
    }, [])
    const productState = useSelector((state) => state.product.products)
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            title: productState[i].title,
            brand: productState[i].brand,
            category: productState[i].category,
            price: `$ ${productState[i].price}`,
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
                    <h3 className="h3 ps-3 my-3 mb-3">Product Lists</h3>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products