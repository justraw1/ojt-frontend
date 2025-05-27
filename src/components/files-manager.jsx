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
    return { upload, fetch_documents };
}