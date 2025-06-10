import DataTable from "react-data-table-component"
import { Button } from 'react-bootstrap'
import { FilesManager } from "../components/files-manager"
import DeleteModal from "../modals/delete-modal"
import EditModal from "../modals/edit-modal"
import UploadModal from "../modals/upload-modal"
import { useEffect, useState } from "react"

export default function DocumentList({ onRefresh }) {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [searchText, setSearchText] = useState("");
    const { fetch_documents, delete_document, fetch_pending_count } = FilesManager();
    const [documents, setDocuments] = useState([]);
    const [pendingCount, setPendingCount] = useState("");

    const columns = [
        {
            name: 'Document Name',
            selector: row => row.file_name,
            sortable: false,
            width: '25%',
        },
        {
            name: 'Uploaded By',
            selector: row => row.uploaded_by,
            sortable: false,
            width: '15%',
        },
        {
            name: 'Document Type',
            selector: row => row.file_type,
            sortable: false,
            width: '15%',
        },
        {
            name: 'Uploaded At',
            selector: row => formatDateTime(row.uploaded_at),
            sortable: true,
            width: '20%',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex justify-content-evenly w-100">
                    <Button variant="info" onClick={() => toggleEditModal(row.id)}>Edit</Button>
                    <Button variant="success" 
                            onClick={() => {
                                const fileUrl = `http://localhost:8000/storage/${ row.file_url }`;
                                const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
                                const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(`http://localhost:8000/storage/${row.file_url}`)}&embedded=true`;
                                window.open(fileUrl, "_blank");
                            }}>Open</Button>
                    {/* <Button 
                        as="a" 
                        href={`http://localhost:8000/storage/${ row.file_url }`}
                        download= {row.file_name}
                        target="_blank"
                        rel="noopener noreferrer">Download</Button> */}
                    <Button variant="danger" onClick={() => toggleDeleteModal(row.id)}>Delete</Button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '25%',
        }
    ];

    const customStyles = {
        table: {
            style: {
                height: '50dvh',
            }
        },
        headCells: {
            style: {
                fontWeight: 'bold',
                backgroundColor: '#18632b',
                color: '#fff',
                paddingLeft: '2.5%',
                justifyContent: 'center',
            },
        },
        cells: {
            style: {
                justifyContent: 'center',
            }
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) {
            return "N/A";
        }
    
        // Convert to a Date object
        const date = new Date(dateString);
    
        // Format the date with options
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true,
            timeZone: 'Asia/Manila'
        };
    
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const toggleUploadModal = () => {
        setShowUploadModal(!showUploadModal);
    }

    const toggleDeleteModal = (id) => {
        setSelectedDocument(id);
        setShowDeleteModal(!showDeleteModal);
    }

    const toggleEditModal = (id) => {
        setSelectedDocument(id);
        setShowEditModal(!showEditModal);
    }

    const fetchDocuments = async() => {
        const documents = await fetch_documents();
        const filteredDocuments = documents.filter(document => document.status !== "Pending");
        setDocuments(filteredDocuments);
    }

    const fetchPendingCount = async() => {
        const count = await fetch_pending_count();
        setPendingCount(count);
    }

    const filteredDocuments = documents.filter(document => {
        if(!searchText) return true;

        const searchLower = searchText.toLowerCase();

        const formattedDate = document.uploaded_at 
        ? formatDateTime(document.uploaded_at).toLowerCase() 
        : "";

        return (
            (document.file_name?.toLowerCase() || '').includes(searchLower) ||
            (document.uploaded_by?.toLowerCase() || '').includes(searchLower) ||
            formattedDate.includes(searchLower)
        );
    });

    useEffect(() => {
        fetchDocuments();
        fetchPendingCount();
    }, [onRefresh])

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="d-flex mb-4">
                <div className="card me-3" style={{ width: '35rem', height: '10rem' }}>
                    <h5 className="card-title text-center mt-2">Total Documents</h5>
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <p className="card-text text-center">{ filteredDocuments.length }</p>
                    </div>
                </div>
                <div className="card" style={{ width: '35rem', height: '10rem' }}>
                    <h5 className="card-title text-center mt-2">Pending Documents</h5>
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <p className="card-text text-center">{ pendingCount }</p>
                    </div>
                </div>
            </div>
            <div className="logs-table w-100">
                <DataTable
                    title="Documents"
                    columns={ columns }
                    data={ filteredDocuments }
                    customStyles={ customStyles }
                    pagination
                    highlightOnHover
                    pointerOnHover
                subHeader
                subHeaderComponent={(
                    <div className="d-flex column w-100 justify-content-between">
                        <div></div>
                        <div className="w-50">
                            <input 
                                type="search"
                                value={ searchText }
                                onChange={e => setSearchText(e.target.value)}
                                className="form-control w-100 border-1 border-black"
                                placeholder="Search"/>
                        </div>

                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={() => toggleUploadModal()}>
                                    Upload File
                            </button>
                        </div>
                    </div>
                )} />
            </div>

                { showUploadModal && <UploadModal 
                                        onClose={() => {
                                            toggleUploadModal();
                                            fetchDocuments();
                                            fetchPendingCount();
                                        }}/>}

                { showDeleteModal && <DeleteModal 
                                        onClose={() => setShowDeleteModal() }
                                        onDelete={ async() => {
                                            setShowDeleteModal(true);
                                            await delete_document(selectedDocument);
                                            fetchDocuments();
                                            fetchPendingCount();
                                            setShowDeleteModal(false);
                                        }}/>}
                
                { showEditModal && <EditModal
                                        onClose={() => {
                                            setShowEditModal();
                                            fetchDocuments();
                                        }}
                                        file_id={ selectedDocument }/>}
        </div>
    );
}