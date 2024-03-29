import React, {useState, useEffect } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBlogCategory, getBlogCategories, resetState } from '../features/blogCategory/bcategorySlice'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import CustomModel from '../components/CustomModel';
import { toast } from 'react-toastify';



const columns = [
    {
        title: 'S.N.',
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

    const [open, setOpen] = useState(false);
    const [blogCatId, setBlogCatId] = useState('')

    const showModal = (e) => {
        setOpen(true);
        setBlogCatId(e)
    };
    const hideModal = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(resetState())
        dispatch(getBlogCategories())
    }, [])
    const blogCatDataState = useSelector((state) => state.blogCategory.blogCategories)

    const data1 = [];
    for (let i = 0; i < blogCatDataState.length; i++) {
        const createdAt = new Date(blogCatDataState[i].createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1; // Months are 0-based, so add 1
        const day = createdAt.getDate();
        const formattedDate = `${year}-${month}-${day}`;
        data1.push({
            key: i + 1,
            title: blogCatDataState[i].title,
            createdDate: formattedDate,
            action:
                <div className='d-flex'>
                    <Link to={`/admin/add-blog-category/${blogCatDataState[i]._id}`} className=''><BiEdit className='text-info fs-5' /></Link>&nbsp;
                    <button
                        className='ms-2 bg-transparent border-0'
                        onClick={() => showModal(blogCatDataState[i]._id)}>
                        <AiFillDelete className='text-danger fs-5' />
                    </button>
                </div>
        });
    }
    const delBlogCat = (e) => {
        dispatch(deleteBlogCategory(e))
        setOpen(false);
        setTimeout(() => {
            dispatch(getBlogCategories())
        }, 100)
        toast.error('Blog Catgeory deleted successfully!');
    }
    return (
        <>
            <div className="container-fluid px-0 md-px-4">
                <div className="row my-5 mx-0 mx-md-3 ">
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3 className="fs-3 ps-2 my-3">Blog Categories</h3>
                        <Link to="/admin/add-blog-category" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1' /> Add <span className='d-none d-sm-inline'>Blog Category</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                    <CustomModel
                        title='Are you sure want to delete this blog category?'
                        hideModal={hideModal}
                        open={open}
                        performAction={() => delBlogCat(blogCatId)}
                    />
                </div>
            </div>
        </>
    )
}

export default BlogcatList