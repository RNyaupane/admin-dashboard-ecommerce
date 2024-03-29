import React from 'react'

const CustomInput = (props) => {
    const { type, label, id, name, val, onCh, onBl, className } = props;
    return (
        <>
            <div className="mb-3">
                <input
                    type={type}
                    className={className}
                    placeholder={label}
                    aria-describedby="emailHelp"
                    id={id}
                    name={name}
                    value={val}
                    onChange={onCh}
                    onBlur={onBl}
                />
                {/* <div id="emailHelp" className="form-text text-danger">Enter Valid Title</div> */}
            </div>
        </>
    )
}

export default CustomInput