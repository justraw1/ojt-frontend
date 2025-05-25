import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';

export default function Sidenav() {
    return (
        <div className="sidenav-background">

            <div className="d-flex sidebar">
                <div className="d-flex column justify-content-between flex-column">
                    <h3 className="navbar-logo fw-bold text-white text-center pt-3">IAELO</h3>
                    <br />
                    <Nav defaultActiveKey="#" className="flex-column">
                        <Nav.Link href="#" className="rounded-start nav-button">Dashboard</Nav.Link>
                        <Nav.Link href="#" className="rounded-start nav-button">Documents</Nav.Link>
                        <Nav.Link href="#" className="rounded-start nav-button">Pending Submissions</Nav.Link>
                    </Nav>
                    <Button
                        variant="danger"
                        className="mt-auto mb-4 w-75 ms-4 rounded-1"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}