import React from 'react'
import { Link } from 'react-router-dom'
import CustomInput from '../components/CustomInput'

const ForgotPassword = () => {
  return (
    <>
      <div className="container login-wrapper mt-5 overflow-hidden">
        <div className="row">
          <div className="col-md-4 offset-md-4  ">
            <div className="card my-5 rounded-0 ">
              <form className="card-body cardbody-color px-lg-5">
                <h2 className="text-center text-dark mb-4">Forgot Password</h2>
                <small>Enter a email address associated with your account and we will send reset password link.</small>
                <div className="my-5">
                  <CustomInput type="email" label="Enter Your Email" />
                </div>
                <div className="text-center"><button type="submit" className="btn btn-color px-5 my-4 w-100 ">Submit</button></div>
                <div id="emailHelp" className="form-text text-center mb-5 text-dark">Remember
                  Password? <Link to="/login" className="text-dark fw-bold"> Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword