import DataTable from "react-data-table-component"
import { Button } from 'react-bootstrap'
import UploadModal from "../modals/upload-modal"
import { useState } from "react"

export default function MOAList() {
    const [showUploadModal, setShowUploadModal] = useState("false");
    const columns = [
        {
            name: 'Document Name',
            selector: row => row.document,
            sortable: true,
            width: '35%',
        },
        {
            name: 'Uploaded By',
            selector: row => row.name,
            sortable: false,
            width: '20%',
        },
        {
            name: 'Uploaded At',
            selector: row => row.name,
            sortable: true,
            width: '20%',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex justify-content-evenly w-100">
                    <Button variant="info" className="">Edit</Button>
                    <Button variant="success">Open</Button>
                    <Button>Download</Button>
                    <Button variant="danger" className="">Delete</Button>
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
                height: '80vh',
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

    // Dummy data for demonstration (MOA documents)
    const data = [
        {
            id: 1,
            document: "MOA_2024_001.pdf",
            name: "admin_user",
        },
        {
            id: 2,
            document: "MOA_2024_002.pdf",
            name: "staff_member",
        },
        {
            id: 3,
            document: "MOA_2024_003.pdf",
            name: "coordinator",
        }
    ];

    return (
        <div className="logs-table">
            <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                pagination
                highlightOnHover
                pointerOnHover
                noDataComponent="Currently Empty"
                subHeader
                subHeaderComponent={(
                    <div className="d-flex column w-100 justify-content-between">
                        <div></div>
                        <div className="w-50">
                            <input 
                                type="search"
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

                { showUploadModal && <UploadModal 
                                        onClose={() => {
                                            toggleUploadModal();
                                        }}/>}
        </div>
    )

}