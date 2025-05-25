import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Sidenav from "../templates/Sidenav"
import NarrativeList from "../data/narrative-table"
import MOAList from '../data/moa-table'
import MOUList from '../data/mou-table';

export default function Documents() {
    return (
        <div className="d-flex document-list-page">
            <Sidenav />
            <div className="document-list">
                <Tabs defaultActiveKey="narrative" fill>
                    <Tab eventKey="moa" title="MOA">
                        <MOAList />
                    </Tab>
                    <Tab eventKey="mou" title="MOU">
                        <MOUList />
                    </Tab>
                    <Tab eventKey="narrative" title="Narrative">
                        <NarrativeList />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}