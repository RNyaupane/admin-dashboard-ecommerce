import React from 'react'
import CustomInput from '../components/CustomInput'

const ResetPassword = () => {
  return (
    <>
      <div className="container login-wrapper mt-5 overflow-hidden">
        <div className="row">
          <div className="col-md-4 offset-md-4  ">
            <div className="card my-5 rounded-0">
              <form className="card-body cardbody-color px-lg-5">
                <h2 className="text-center text-dark mb-3">Reset Password</h2>

                <div className="mb-3 mt-5">
                  <CustomInput type="password" label="New Password" />
                </div>
                <div className="mb-5">
                <CustomInput type="password" label="Confirm New Password" />
                </div>
                <div className="text-center">
                  <button  className="btn btn-color px-5 mb-5 w-100 ">Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword