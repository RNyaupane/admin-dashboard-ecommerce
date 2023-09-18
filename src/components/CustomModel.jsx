import React from 'react'
import { Modal, Space } from 'antd';


const CustomModel = (props) => {
    const { open, hideModal, performAction, title } = props;
    return (
        <>
            <Modal
                title="Delete Confrimation"
                open={open}
                onOk={performAction}
                onCancel={hideModal}
                okText="Ok"
                cancelText="Cancel"
            >
                <p>{title}</p>
            </Modal>
        </>
    )
}

export default CustomModel