import Sidenav from "../templates/Sidenav"
import PendingList from "../data/pending-table";

export default function Pending() {
    return (
        <div className="d-flex document-list-page">
            <Sidenav />
            <div className="document-list">
                <PendingList />
            </div>
        </div>
    );
}