/**
 * AdminDashboard.js
 * 
 * This is a React component that fetches and displays a line chart of budget data for the past year.
 * 
 * The component uses the useState and useEffect hooks to manage the state and side effects. It also uses the axios library to send HTTP requests to the server.
 * 
 * The budget data is fetched from the `/budgets/date/:startDate/:endDate` endpoint, with the start and end dates set to one year apart.
 * 
 * The fetched data is processed into a format suitable for the recharts library, which is used to create the line chart. The chart displays the date on the x-axis and the money on the y-axis.
 * 
 * The component also includes a welcome message for the admin.
 * 
 * @module components/AdminDashboard
 */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { format } from 'date-fns';

const AdminDashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);

        axios.get(`/budgets/date/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`)
            .then((response) => {
                const dataMap = new Map();

                response.data.forEach(item => {
                    const date = format(new Date(item.Date), 'd MMM yy');
                    const money = item.Money;

                    if (dataMap.has(date)) {
                        dataMap.set(date, dataMap.get(date) + money);
                    } else {
                        dataMap.set(date, money);
                    }
                });

                const formattedData = Array.from(dataMap, ([Date, Money]) => ({ Date, Money }));

                setData(formattedData.reverse());
            })
            .catch(() => {
                setData([]);
            });
    }, []);

    return (
        <Container>
            <Row className="justify-content-center my-5">
                <Col md={8} className="text-center">
                    <h1>Welcome, Admin!</h1>
                    <p>This is your dashboard. More features coming soon...</p>
                </Col>
                <Col xs={12}>
                    <div style={{ backgroundColor: '#e8e8ff', padding: '10px', borderRadius: '15px' }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <XAxis dataKey="Date" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Line type="natural" dataKey="Money" stroke="#8884d8" activeDot={{r: 8}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;