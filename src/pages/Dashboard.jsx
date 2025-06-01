import Sidenav from "../templates/Sidenav"
import DocumentList from "../data/document-table";

export default function Dashboard() {
    return (
        <div className="d-flex document-list-page">
            <Sidenav />
            <div className="document-list">
                <DocumentList />
            </div>
        </div>
    );
}