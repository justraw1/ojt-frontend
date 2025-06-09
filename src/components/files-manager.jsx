import backend_api from "./backend-api"
import { toast_success, toast_fail } from "./toasters"

export const FilesManager = () => {

    const upload = async(formData) => {
        await backend_api.post("/upload-file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(response => {
            if(response.data.status === "success") {
                toast_success("File has been successfully uploaded");
            }
        })
    }

    const fetch_documents = async() => {
        const response = await backend_api.get("/fetch-documents");
        return response.data.documents;
    }

    const delete_document = async(id) => {
        await backend_api.post("/delete-document", {
            id,
        }).then(response => {
            if (response.data.status === "success") {
                toast_success("Document has been deleted");
            }
        })
    }

    const fetch_document_info = async(file_id) => {
        const response = await backend_api.get(`/fetch-document-info/${ file_id }`);
        return response.data.document_info;
    }

    const update_document = async(file_id, file_name, file_type) => {
        const response = await backend_api.post("/update-document", {
            file_id, file_name, file_type,
        });

        if (response.data.status === "success") {
            toast_success("Document has been updated");
        }
    }

    const fetch_pending_count = async() => {
        const response = await backend_api.get("/fetch-pending-count");
        return response.data.pending_count;
    }

    return { upload, fetch_documents, 
             delete_document, fetch_document_info, 
             update_document, fetch_pending_count };
}