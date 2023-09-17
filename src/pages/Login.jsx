import React, { useEffect } from 'react'
import adminLogo from '../assets/admin-logo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../components/CustomInput'
import { useFormik } from "formik"
import * as Yup from 'yup'; //For Form Validation
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'

const Login = () => {
  let userSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: userSchema,
    onSubmit: values => {
      dispatch(login(values))
      console.log(message)
    }
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  useEffect(() => {
    if (isSuccess) {
      navigate("admin")
    }
    else {
      navigate("")
    }
  }, [user, isLoading, isError, isSuccess])

  return (
    <>
      <div className="container login-wrapper mt-5 overflow-hidden">
        <div className="row">
          <div className="col-md-6 col-lg-5 offset-md-4  ">
            <div className="card my-5 rounded-0">
              {/* <div className="error-message py-2 text-center fs-5" style={{ backgroundColor: '#ebf2fa' }}>
                You are not an admin
              </div> */}
              <div className={`${message == "Rejected" ? "" : "d-none"} alert alert-danger mb-0 rounded-0 text-center border-0`} role="alert">
                <p className=' fade-in mb-0'>{message == "Rejected" ? "You are not an Admin !!" : ""}</p>
              </div>
              <form className="card-body cardbody-color px-lg-5" onSubmit={formik.handleSubmit}>
                <h2 className="text-center text-dark mb-3">Login</h2>

                <div className="text-center">
                  <img src={adminLogo}
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="100px" alt="profile" />
                </div>

                <div className="mb-3">
                  <div className="error">
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <CustomInput
className="form-control custom-input"
                    type="text"
                    name="email"
                    label="Enter Email"
                    id="email"
                    val={formik.values.email}
                    onCh={formik.handleChange('email')}
                    onBl={formik.handleChange('email')}
                  />

                </div>
                <div className="mb-3">
                  <div className="error">
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <CustomInput
className="form-control custom-input"
                    type="password"
                    name="password"
                    label="Enter Password"
                    id="pass"
                    val={formik.values.password}
                    onCh={formik.handleChange('password')}
                    onBl={formik.handleChange('password')}
                  />

                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-color px-5 my-4 ">Login</button>
                </div>
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