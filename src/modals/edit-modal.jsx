import { Modal, Button } from "react-bootstrap"
import { useState } from "react"

export default function EditModal({ onClose }) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    return (
        <Modal show={ show } onHide={ handleClose } centered>
            <Modal.Header>
                <Modal.Title>Edit File</Modal.Title>
            </Modal.Header>

            <form>
                <Modal.Body>

                </Modal.Body>

                <Modal.Footer>

                </Modal.Footer>
            </form>
        </Modal>
    )
}