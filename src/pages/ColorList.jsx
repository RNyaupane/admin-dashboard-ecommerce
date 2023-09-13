import React from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';


const ColorList = () => {
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
            title: 'Status',
            dataIndex: 'status',
        },
    ];
    const data1 = [];
    for (let i = 0; i < 46; i++) {
        data1.push({
            key: i,
            name: `Edward King ${i}`,
            status: `London, Park Lane no. ${i}`,
        });
    }
    return (
        <>
            <div className="container-fluid px-4">
                <div className="row my-5 mx-3 ">
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3 className="fs-3 ps-2 my-3">Color List</h3>
                        <Link to="/admin/add-color" className='text-decoration-none me-4 fs-6'>
                            <AiOutlinePlusCircle className='pb-1' /> Add Color
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

export default ColorList