import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { FilesManager } from "../components/files-manager"

export default function EditModal({ onClose, file_id }) {
    const [show, setShow] = useState(true);
    const [loader, setLoader] = useState("Update");
    const { fetch_document_info, update_document } = FilesManager();
    const [state, setState] = useState({
        file_id: file_id,
        file_name: "",
        file_type: "",
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

    const handleUpdate = async(event) => {
        event.preventDefault();
        setLoader("Updating...");

        await update_document(
            file_id,
            state.file_name,
            state.file_type
        );

        setState((prevState) => ({
            ...prevState,
            file_name: "",
            file_type: "",
        }));
        setShow(false);
        onClose();
    }

    useEffect(() => {
        fetch_document_info(file_id).then(file_data => {
            setState(file_data);
        });
    }, [file_id]);

    return (
        <Modal show={ show } onHide={ handleClose } centered>
            <Modal.Header>
                <Modal.Title>Edit File</Modal.Title>
            </Modal.Header>

            <form onSubmit={ handleUpdate }>
                <Modal.Body>
                    <input 
                        type="text"
                        name="file_name"
                        placeholder="Document Name"
                        className="form-control"
                        onChange={ handleChange }
                        value={ state.file_name }
                        required/>
                    <select
                        name="file_type"
                        className="form-control mt-3"
                        onChange={ handleChange }
                        value={ state.file_type }
                        required>
                        <option disabled value="" defaultValue>Select File Type</option>
                        <option value="MOA">MOA</option>
                        <option value="MOU">MOU</option>
                        <option value="Narrative">Narrative</option>
                    </select>
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