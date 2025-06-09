import Sidenav from "../templates/Sidenav"
import DocumentList from "../data/document-table"
import { ToastContainer } from 'react-toastify'

export default function Dashboard() {
    return (
        <div className="d-flex document-list-page">
            <ToastContainer />
            <Sidenav />
            <div className="document-list">
                <DocumentList />
            </div>
        </div>
    );
}