/**
 * AllBudgets.js
 * 
 * This is a React component that fetches and displays all budgets in a paginated format.
 * 
 * The component uses the useState and useEffect hooks to manage the state and side effects. It also uses the axios library to send HTTP requests to the server and the react-toastify library to display notifications.
 * 
 * The budgets are fetched from the `/budgets?page=${page}` endpoint, with the page number managed by the state.
 * 
 * The fetched budgets are displayed in a grid. Each budget is a link that navigates to the detail page for that budget.
 * 
 * The component also includes a Pagination component from the react-bootstrap library to navigate between pages. The previous button decreases the page number, the next button increases the page number, and the current page number is displayed in the middle.
 * 
 * If an error occurs while fetching the budgets, a toast notification is displayed.
 * 
 * @module components/AllBudgets
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import currencyConstant from '../../constants/currencyConstant';

const AllBudgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await axios.get(`/budgets?page=${page}`);
                console.log(response.data);
                setBudgets(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchBudgets();
    }, [page]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">All Budgets</h1>
            </Row>
            {budgets.length > 0 ? (
                <Row className='align-items-center'>
                    {budgets.map((budget) => (
                        <Col key={budget.BudgetID} md={6}>
                            <Link to={`/budget-detail/${budget.BudgetID}`} className='general-link'>
                                <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>
                                    {budget.Description} <br /> <span className='gradient-text'>{budget.Money} {currencyConstant.CURRENCY_UNIT}</span>
                                </h5>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className='lead fw-bold text-primary'>No budgets found.</p>
            )}
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={budgets.length === 0} />
            </Pagination>
        </Container>
    );
};

export default AllBudgets;