import Sidenav from "../templates/Sidenav"
import PendingList from "../data/pending-table";
import { ToastContainer } from "react-toastify";

export default function Pending() {
    return (
        <div className="d-flex document-list-page">
            <ToastContainer />
            <Sidenav />
            <div className="document-list">
                <PendingList />
            </div>
        </div>
    );
}