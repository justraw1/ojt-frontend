import DataTable from "react-data-table-component";
import { Button } from 'react-bootstrap';

export default function DocumentList() {
    const columns = [
        {
            name: 'Document Name',
            selector: row => row.document,
            sortable: true,
            width: '40%',
        },
        {
            name: 'Uploader',
            selector: row => row.name,
            sortable: false,
            width: '30%',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex">
                    <Button variant="info" className="me-2">Edit</Button>
                    <Button variant="danger" className="ms-2">Delete</Button>
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
                height: '65vh',
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

    // Dummy data for demonstration (documents)
    const data = [
        {
            id: 1,
            document: "Document_2024_001.pdf",
            name: "admin_user",
        },
        {
            id: 2,
            document: "Document_2024_002.pdf",
            name: "user_one",
        },
        // Add more dummy data as needed
    ];

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="d-flex mb-4">
                <div className="card me-3" style={{ width: '48rem', height: '10rem' }}>
                    <h5 className="card-title text-center mt-2">Total Documents</h5>
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <p className="card-text text-center">{data.length}</p>
                    </div>
                </div>
                <div className="card" style={{ width: '48rem', height: '10rem' }}>
                    <h5 className="card-title text-center mt-2">Pending Documents</h5>
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <p className="card-text text-center">0</p>
                    </div>
                </div>
            </div>
            <div className="logs-table w-100">
                <DataTable
                    title="Documents"
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    );
}