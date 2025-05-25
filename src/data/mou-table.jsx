import DataTable from "react-data-table-component";
import { Button } from 'react-bootstrap';

export default function MOUList() {
    const columns = [
        {
            name: 'Document Name',
            selector: row => row.document,
            sortable: true,
            width: '40%',
        },
        {
            name: 'Uploaded By',
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

    // Dummy data for demonstration
    const data = [
        {
            id: 1,
            document: "MOU_2024_001.pdf",
            name: "admin_user",
        },
        {
            id: 2,
            document: "MOU_2024_002.pdf",
            name: "staff_member",
        },
        {
            id: 3,
            document: "MOU_2024_003.pdf",
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
            />
        </div>
    )

}