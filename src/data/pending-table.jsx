import DataTable from "react-data-table-component";
import { Button } from 'react-bootstrap';
import { FilesManager } from "../components/files-manager"
import { useEffect, useState } from "react"

export default function PendingList({ onRefresh }) {
    const [searchText, setSearchText] = useState("");
    const { fetch_pending_documents, accept_document, reject_document } = FilesManager();
    const [documents, setDocuments] = useState([]);
    const [loader, setLoader] = useState("Accept");
    const [loader2, setLoader2] = useState("Reject");

    const columns = [
        {
            name: 'Document Name',
            selector: row => row.file_name,
            sortable: true,
            width: '20%',
        },
        {
            name: 'Uploaded By',
            selector: row => row.uploaded_by,
            sortable: false,
            width: '20%',
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
            width: '15%',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex">
                    <Button variant="info"
                            className="me-2" 
                            onClick={() => {
                                const fileUrl = `http://localhost:8000/storage/${ row.file_url }`;
                                const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
                                const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(`http://localhost:8000/storage/${row.file_url}`)}&embedded=true`;
                                window.open(fileUrl, "_blank");
                            }}>Open</Button>
                    <Button variant="success" 
                            className="me-2"
                            onClick={() => handleAccept(row.id)}>{ loader }</Button>
                    <Button variant="danger"
                            onClick={() => handleReject(row.id)}>{ loader2 }</Button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '30%',
        }
    ];

    const customStyles = {
        table: {
            style: {
                height: '75vh',
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

    const fetchDocuments = async() => {
        const documents = await fetch_pending_documents();
        setDocuments(documents);
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

    const handleAccept = async(id) => {
        setLoader("Accepting...");
        await accept_document(id);
        fetchDocuments();
        setLoader("Accept");
    }

    const handleReject = async(id) => {
        setLoader2("Rejecting...");
        await reject_document(id);
        fetchDocuments();
        setLoader2("Reject");
    }

    useEffect(() => {
        fetchDocuments();
    }, [onRefresh])

    return (
        <div className="logs-table">
                <DataTable
                    title="Pending Documents"
                    columns={ columns }
                    data={ filteredDocuments }
                    customStyles={ customStyles }
                    pagination
                    highlightOnHover
                    pointerOnHover
                subHeader
                subHeaderComponent={(
                    <div className="d-flex column w-100 justify-content-center">
                        <div className="w-50">
                            <input 
                                type="search"
                                value={ searchText }
                                onChange={e => setSearchText(e.target.value)}
                                className="form-control w-100 border-1 border-black"
                                placeholder="Search"/>
                        </div>
                    </div>
                )} />
        </div>
    )
}