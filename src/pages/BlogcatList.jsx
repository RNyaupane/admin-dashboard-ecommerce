import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBlogCategory } from '../features/blogCategory/bcategorySlice'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'



const columns = [
    {
        title: 'Serial No.',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Created',
        dataIndex: 'createdDate',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const BlogcatList = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogCategory())
    }, [])
    const blogCatDataState = useSelector((state)=>state.blogCategory.blogCategories)
    
    const data1 = [];
    for (let i = 0; i < blogCatDataState.length; i++) {
        const createdAt = new Date(blogCatDataState[i].createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1; // Months are 0-based, so add 1
        const day = createdAt.getDate();
        const formattedDate = `${year}-${month}-${day}`;
        data1.push({
            key: i+1,
            title: blogCatDataState[i].title,
            createdDate: formattedDate,
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
                        <h3 className="fs-3 ps-2 my-3">Blog Categories</h3>
                        <Link to="/admin/add-blog-category" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1'/> Add Blog Category
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

export default BlogcatList