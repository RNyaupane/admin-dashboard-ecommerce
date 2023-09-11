import React from 'react'

const CustomInput = (props) => {
    const { type, label } = props;
    return (
        <>
            <div className="mb-3">
                <input type={type} className="form-control custom-input " placeholder={label} aria-describedby="emailHelp" />
                {/* <div id="emailHelp" className="form-text text-danger">Enter Valid Title</div> */}
            </div>
        </>
    )
}

export default CustomInput