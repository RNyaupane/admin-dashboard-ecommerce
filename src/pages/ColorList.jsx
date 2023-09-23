import React, { useEffect,useState } from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteColor, getColors, resetState } from '../features/color/ColorSlice'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { toast } from 'react-toastify';
import CustomModel from '../components/CustomModel';


const columns = [
    {
        title: 'S.N.',
        dataIndex: 'key',
    },
    {
        title: 'Color Name',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const ColorList = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState('')

    const showModal = (e) => {
        setOpen(true);
        setColorId(e)
    };
    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(resetState())
        dispatch(getColors())
    }, [])

    const colorDataState = useSelector((state) => state.color.colors)

    const data1 = [];
    for (let i = 0; i < colorDataState.length; i++) {
        data1.push({
            key: i,
            name: colorDataState[i].title,
            action:
                <div className='d-flex'>
                    <Link to={`/admin/add-color/${colorDataState[i]._id}`} className=''><BiEdit className='text-info fs-5' /></Link>&nbsp;
                    <button
                        className='ms-2 bg-transparent border-0'
                        onClick={() => showModal(colorDataState[i]._id)}>
                        <AiFillDelete className='text-danger fs-5' />
                    </button>
                </div>
        });
    }
    const delColor = (e) => {
        dispatch(deleteColor(e))
        setOpen(false);
        setTimeout(()=>{
            dispatch(getColors())
        },100)
        toast.error('Color deleted!');
    }

    return (
        <>
            <div className="container-fluid px-0 md-px-4">
                <div className="row my-5 mx-0 mx-md-3 ">
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3 className="fs-3 ps-2 my-3">Color List</h3>
                        <Link to="/admin/add-color" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1' /> Add Color
                        </Link>
                    </div>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                    <CustomModel
                        title='Are you sure want to delete this color?'
                        hideModal={hideModal}
                        open={open}
                        performAction={() => delColor(colorId)}
                    />
                </div>
            </div>
        </>
    )
}

export default ColorList