import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

export default function DeleteModal({ onClose, onDelete }) {
    const [show, setShow] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    const handleDelete = async() => {
        setIsDeleting(true);
        await onDelete();
        setIsDeleting(false);
        handleClose();
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header className='bg-[#070372]'>
                <Modal.Title className="fw-bold">Delete Confirmation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure??</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="info" onClick={ handleClose }>
                    Cancel
                </Button>
                <Button 
                    variant="danger" 
                    onClick={ handleDelete }
                    disabled={ isDeleting }>
                    { isDeleting ? "Deleting..." : "Delete" }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}