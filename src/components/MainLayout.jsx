import React, { useState } from 'react'
import Dashboard from '../pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { menuLinkData } from '../utils/Data'
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [menuLinkTwo, setMenuLinkTwo] = useState('')
  const toggleButtonHandler = () => {
    setIsToggled(!isToggled);
  };


  return (
    <>
      <div className={`d-flex ${isToggled ? "toggled" : ""}`} id="wrapper">

        {/* <!-- Sidebar --> */}
        <div className="" style={{ backgroundColor: 'white' }} id="sidebar-wrapper">
          <div className="sidebar-heading text-center py-4  fs-4 fw-bold text-uppercase">
            Logo Here
          </div>
          <div className="list-group list-group-flush my-3" id="list-tab" role="tablist">

            <Link to="/admin" className="list-group-item list-group-item-action bg-transparent primary-text fw-bold border-bottom" >
              <i className="fas fa-tachometer-alt me-2"></i>Dashboard
            </Link>
            <Link to="customers" className="list-group-item list-group-item-action bg-transparent primary-text fw-bold border-bottom" >
              <i className="fas fa-users me-2"></i>Customers
            </Link>
            <Link to="orders" className="list-group-item list-group-item-action bg-transparent primary-text fw-bold border-bottom" >
              <i className="fas fa-truck me-2"></i>Orders
            </Link>
            {/* Customers Menu with Down Arrow Icon */}
            {menuLinkData.map((props) => {
              return (
                <div key={props.id} className='border-bottom'>
                  <a
                    href={`#${props.id}`}
                    className="list-group-item list-group-item-action bg-transparent primary-text fw-bold d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                  >
                    <div>
                      <i className={`${props.icon} me-2`}></i>{props.label}
                    </div>
                    <i className="fas fa-angle-down"></i> {/* Down Arrow Icon */}
                  </a>
                  <div className="list-group list-group-flush collapse ps-4" id={props.id}>
                    <Link to={props.submenu1Link} className="list-group-item list-group-item-action bg-transparent primary-text fw-bold">
                      {props.submenu1}
                    </Link>

                    {props.submenu2.trim() === '' ? (
                      <Link to={props.submenu2Link} className="list-group-item list-group-item-action bg-transparent primary-text fw-bold d-none">
                        {props.submenu2}
                      </Link>
                    ) : (
                      <Link to={props.submenu2Link} className="list-group-item list-group-item-action bg-transparent primary-text fw-bold">
                        {props.submenu2}
                      </Link>
                    )}
                    <Link to={props.submenu3Link} className="list-group-item list-group-item-action bg-transparent primary-text fw-bold">
                      {props.submenu3}
                    </Link>
                  </div>
                </div>
              )
            })}
            <Link to="" className="list-group-item list-group-item-action bg-transparent primary-text fw-bold border-bottom" >
              <i className="fas fa-gift me-2"></i>Sales
            </Link>
            <Link to='enquiries' className="list-group-item list-group-item-action bg-transparent primary-text fw-bold border-bottom" >
              <i className="fas fa-info-circle me-2"></i>Enquiries
            </Link>
            <Link to="/" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold border-bottom">
              <i className="fas fa-power-off me-2"></i>Logout
            </Link>
          </div>
        </div>

        {/* <!-- /#sidebar-wrapper -->

        <!-- Page Content --> */}
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-white py-4 px-4">
            <div className="d-flex align-items-center">
              <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" onClick={toggleButtonHandler}></i>
              <h2 className="fs-2 m-0">Dashboard</h2>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav ms-auto text-center mb-lg-0">
                <a className=" me-0 me-lg-3 nav-link second-text fw-bold position-relative" role="button">
                  <i className="fas fa-bell me-2 fs-5"></i>
                  <span className="position-absolute start-50 d-none d-lg-block  badge rounded-circle bg-danger" style={{ top: "-2px", fontSize: '0.75rem', padding: '2px 5px' }}>
                    5 {/* You can replace this number with your actual notification count */}
                  </span>
                  <span className='d-lg-none'>Notifications</span>
                </a>
                <li className="nav-item dropdown d-block d-lg-flex">
                  <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-user me-2 fs-5"></i>Profile Name
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainLayout