import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Sidenav from "../templates/Sidenav"
import NarrativeList from "../data/narrative-table"
import MOAList from '../data/moa-table'
import MOUList from '../data/mou-table'
import { ToastContainer } from 'react-toastify'
import { useState } from "react"

export default function Documents() {
    const [activeTab, setActiveTab] = useState('MOA');
    return (
        <div className="d-flex document-list-page">
            <ToastContainer />
            <Sidenav />
            <div className="document-list">
                <Tabs activeKey={ activeTab } onSelect={(key) => setActiveTab(key)} fill>
                    <Tab eventKey="MOA" title="MOA">
                        {activeTab === 'MOA' && <MOAList documentFilter={ activeTab } />}
                    </Tab>
                    <Tab eventKey="MOU" title="MOU">
                        {activeTab === 'MOU' && <MOUList documentFilter={ activeTab } />}
                    </Tab>
                    <Tab eventKey="Narrative" title="Narrative">
                        {activeTab === 'Narrative' && <NarrativeList documentFilter={ activeTab} />}
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}