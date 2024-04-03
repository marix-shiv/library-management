import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import UsersSearch from "../Users/UsersSearch/UsersSearch";
import UsersSearchResult from "../Users/UsersSearch/SearchResult";
import axios from "axios";

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState(null);

    const usersSearch = (query, setIsLoading) => {
        axios
            .get(`/users/search/${query}`)
            .then((response)=>{
                setUsers(response.data);
            })
            .catch(()=>{
                setUsers({});
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }

    return (
        <Container>
            <Row className="justify-content-center my-5">
                <Col md={8} className="text-center">
                    <h1>Welcome, Super Admin!</h1>
                    <p>This is your dashboard. More features coming soon...</p>
                </Col>
                <h1 className="d-flex align-items-center justify-content-center">Search Users<Search color="#2A2A84" size={36} className="ms-2"/></h1>
                <div className="d-flex justify-content-center my-4 px-md-5">
                    <UsersSearch
                        onSearch={usersSearch}
                        onClear={() => {
                            setUsers(null);
                        }}
                        setResults={setUsers}
                    />
                </div>
                <div className="grid-container my-4 mx-4">
                    {users ? (
                        Object.keys(users).length > 0 ? (
                            Object.values(users).map((result, index) => (
                                <div className="grid-item" key={index}>
                                    <UsersSearchResult result={result} />
                                </div>
                            ))
                        ) : (
                            <div className="grid-item">
                                <UsersSearchResult result={null} />
                            </div>
                        )
                    ) : (
                        ""
                    )}
                </div>
            </Row>
        </Container>
    );
};

export default SuperAdminDashboard;