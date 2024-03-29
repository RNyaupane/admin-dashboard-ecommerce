import React from 'react'
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';




const Dashboard = () => {
  const columns = [
    {
      title: 'S.N.',
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
  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Feb',
      sales: 100,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'Jun',
      sales: 78,
    },
    {
      type: 'Jul',
      sales: 38,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Sept',
      sales: 38,
    },
    {
      type: 'Oct',
      sales: 62,
    },
    {
      type: 'Nov',
      sales: 88,
    },
    {
      type: 'Dec',
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      // You can manually configure the label data label position
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // Configure style
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Category',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };

  return (
    <>
      <div className="container-fluid px-2 md-px-4">
        <div className="row g-3 my-2 px-3 md-px-1">
          <div className="col-md-6 col-lg-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-3">720</h3>
                <p className="fs-5">Products</p>
              </div>
              <i className="fas fa-gift fs-4 primary-text border rounded-full secondary-bg p-4"></i>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-3">4920</h3>
                <p className="fs-5">Sales</p>
              </div>
              <i
                className="fas fa-hand-holding-usd fs-4 primary-text border rounded-full secondary-bg p-4"></i>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-3">3899</h3>
                <p className="fs-5">Delivery</p>
              </div>
              <i className="fas fa-truck fs-4 primary-text border rounded-full secondary-bg p-4"></i>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-3">%25</h3>
                <p className="fs-5">Increase</p>
              </div>
              <i className="fas fa-chart-line fs-4 primary-text border rounded-full secondary-bg p-4"></i>
            </div>
          </div>
        </div>

        <div className="row mt-4 mx-2" >
          <h3 className="fs-4 mb-5">Income Statics</h3>
          <Column {...config} />
        </div>

        <div className="row my-5 mx-0 mx-md-3 " >
          <h3 className="h3 mb-3 ps-3 my-3">Recent Orders</h3>
          <div className="col ">
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard