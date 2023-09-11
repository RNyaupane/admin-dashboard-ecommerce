import React from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';

const Products = () => {
    const columns = [
        {
            title: 'Serial No.',
            dataIndex: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Product',
            dataIndex: 'product',
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
            product: 32,
            status: `London, Park Lane no. ${i}`,
        });
    }
    return (
        <>
            <div className="container-fluid px-4">
                <div className="row my-5 mx-3 shadow-sm">
                    <h3 className="fs-4 ps-4 my-3">Products</h3>
                    <div className="col">
                        <Table columns={columns} dataSource={data1} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products