import { Modal, Button } from "react-bootstrap"
import { useState } from "react"
import { FilesManager } from "../components/files-manager";

export default function UploadModal({ onClose }) {
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState("Upload");
    const { upload } = FilesManager();
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

    const handleFileChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            file_url: event.target.files[0]
        }));
    };

    const handleUpload = async(event) => {
        event.preventDefault();
        setLoader("Uploading");

        const formData = new FormData();
        formData.append("file_name", state.file_name);
        formData.append("file_url", state.file_url);
        formData.append("document_type", state.document_type);
        formData.append("uploaded_by", state.uploaded_by);

        await upload(formData);
        setLoader("Upload");
        handleClose();
    }

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

            <form onSubmit={ handleUpload }>
                <Modal.Body>
                    <div>
                        <input 
                            type="text"
                            name="file_name"
                            placeholder="Document Name"
                            className="form-control"
                            onChange={ handleChange }
                            value={ state.file_name }
                            required/>
                        <input
                            type="file"
                            name="file_url"
                            placeholder="Choose a file"
                            className="form-control mt-3 file-upload-input"
                            onChange={ handleFileChange }
                            required/>
                        <select
                            name="document_type"
                            className="form-control mt-3"
                            onChange={ handleChange }
                            value={ state.document_type }
                            required>
                            <option disabled value="" defaultValue>Select File Type</option>
                            <option value="MOA">MOA</option>
                            <option value="MOU">MOU</option>
                            <option value="Narrative">Narrative</option>
                            <option value="Re-Entry">Re-Entry</option>
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