import React, { useState, useRef } from 'react';


const AddProductCat = () => {

    return (
        <div className='container-fluid my-5 w-md-75'>
            <h3 className='mb-4'>Add Product Category</h3>
            <div className="">
                <form action="">
                    <div className="mb-3">
                        <input type="text" className="form-control custom-input " id="blogTitle" placeholder='Enter Product Category' aria-describedby="emailHelp" />
                        {/* <div id="emailHelp" className="form-text text-danger">Enter Valid Title</div> */}
                    </div>
                    <button type="button" className="btn btn-success mt-4 px-5 fs-5">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProductCat;
