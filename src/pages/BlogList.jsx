import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBlogs } from '../features/blogs/BlogSlice'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const columns = [
    {
        title: 'S.N.',
        dataIndex: 'key',
    },
    {
        title: 'Blog Title',
        dataIndex: 'title',
    },
    {
        title: 'Views',
        dataIndex: 'views',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Likes',
        dataIndex: 'likes',
    },
    {
        title: 'Dislikes',
        dataIndex: 'dislikes',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const BlogList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogs())
    }, [])

    const blogDataState = useSelector((state) => state.blog.blogs);

    const data1 = [];
    for (let i = 0; i < blogDataState.length; i++) {
        const likesCount = blogDataState[i].likes.length;
        const dislikesCount = blogDataState[i].dislikes.length;
        data1.push({
            key: i + 1,
            title: blogDataState[i].title,
            views: blogDataState[i].numViews,
            category: blogDataState[i].category,
            likes: likesCount,
            dislikes: dislikesCount,
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
                        <h3 className="fs-3 ps-2 my-3">Blogs</h3>
                        <Link to="/admin/add-blog" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1' /> Add Blog
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

export default BlogList