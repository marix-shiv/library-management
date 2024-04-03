import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import { Search, Trash } from 'react-bootstrap-icons';


const SearchBudgets = () => {
    const [query, setQuery] = useState('');
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        setBudgets([]);
    }, [query]);

    const fetchBudgets = async () => {
        if (query) {
            try {
                const response = await axios.get(`/budgets/search/${query}`);
                setBudgets(response.data);
                if(response.data.length === 0){
                    toast.info("No budget found!")
                }
            } catch (error) {
                toast.error('Something went wrong!');
            }
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">Search Budgets</h1>
            </Row>
            <Row>
            <Col md={6} className="mx-auto">
            <InputGroup className="d-inline-flex my-5 text-center position-relative rounded-pill bg-light">
                <FormControl
                    type="text"
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="rounded-pill bg-light no-border ps-4 py-3"
                    style={{border: 'none'}}
                    placeholder="Search..."
                />
                <Button variant="outline" onClick={fetchBudgets} size="lg" className="bg-light rounded-pill">
                    <Search className="icon-tilt"/>
                </Button>
                <Button variant="outline" size="lg" onClick={() => {setQuery(''); setBudgets([]);}} className="bg-light rounded-pill">
                    <Trash className="icon-tilt"/>
                </Button>
            </InputGroup>
            </Col>
            </Row>
            {query ? (
                budgets.length > 0 ? (
                    <Row className='align-items-center my-5'>
                        {budgets.map((budget) => (
                            <Col key={budget.BudgetID} md={6}>
                                <Link to={`/budget-detail/${budget.BudgetID}`} className='general-link'>
                                    <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>
                                        {budget.Description} <br /> {budget.Money}
                                    </h5>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                ) : (
                   ''
                )
            ) : (
                <p className='lead fw-bold text-primary my-5'>Please enter a search query.</p>
            )}
        </Container>
    );
};

export default SearchBudgets;