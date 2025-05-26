import { Modal, Button } from "react-bootstrap"
import { useState } from "react"

export default function UploadModal({ onClose }) {
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState("Upload");
    const [state, setState] = useState({
        uploaded_by: localStorage.getItem("username"),
        file_name: "",
        document_type: "",
        file_url: "",
    });

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    return (
        <Modal
            show={ show }
            onHide={ handleClose }
            centered>

            <Modal.Header>
                <Modal.Title>
                    Upload A File
                </Modal.Title>
            </Modal.Header>

            <form>
                <Modal.Body>
                    <div>
                        <input 
                            type="text"
                            name="file_name"
                            placeholder="Document Name"
                            className="form-control"
                            onChange={ handleChange }
                            required/>
                        <input
                            type="file"
                            name="file_url"
                            placeholder="Choose a file"
                            className="form-control mt-3 file-upload-input"
                            onChange={ handleChange }
                            required/>
                        <select
                            name="file_type"
                            className="form-control mt-3"
                            onChange={ handleChange }
                            required>
                            <option disabled value="" selected>Select File Type</option>
                            <option value="MOA">MOA</option>
                            <option value="MOU">MOU</option>
                            <option value="Narrative">Narrative</option>
                        </select>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" variant="success">
                        { loader }
                    </Button>
                    <Button variant="danger" onClick={ handleClose }>
                        Close
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}