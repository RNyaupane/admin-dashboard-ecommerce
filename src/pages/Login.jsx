import React from 'react'
import adminLogo from '../assets/admin-logo.jpeg'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div className="container login-wrapper mt-5 overflow-hidden">
        <div className="row">
          <div className="col-md-6 col-lg-5 offset-md-4  ">
            <div className="card my-5 rounded-0">
              <form className="card-body cardbody-color px-lg-5">
              <h2 className="text-center text-dark mb-3">Login</h2>

                <div className="text-center">
                  <img src={adminLogo} 
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="100px" alt="profile"/>
                </div>

                <div className="mb-3">
                  <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"
                    placeholder="Email"/>
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <div className="text-center"><button type="submit" className="btn btn-color px-5 my-4 ">Login</button></div>
                <div id="emailHelp" className="form-text text-center mb-5 text-dark">Forgot
                  Password? <Link to="/forgot-password" className="text-dark fw-bold"> Reset Password</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login