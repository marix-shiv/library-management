import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { INSTANCE_MAPPING } from '../../constants/InstanceConstants';
import { format } from 'date-fns';
import {toast} from 'react-toastify';


const BookInstanceDetail = () => {
    const [book, setBook] = useState({ Title: '' });
    const [bookInstance, setBookInstance] = useState({ Status: '', InstanceID: '', Imprint: '', BookID: '' });
    const { id } = useParams();

    useEffect(() => {
        const fetchBookInstance = async () => {
            try {
                const response = await axios.get(`/bookinstances/${id}`);
                console.log("Response data is ", response.data);
                const { Title, ...instanceDetails } = response.data;
                console.log("Title is ", Title);
                console.log("Instance details has ", instanceDetails);
                setBook({ Title });
                setBookInstance(instanceDetails);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchBookInstance();
    }, [id]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold text-primary my-4 justify-content-center">
                <h1 className="display-4 fw-bold my-4 slab-font">{book.Title}</h1>
                <Col md={6}>
                    <Link to={`/book-detail/${bookInstance.BookID}`} className='general-link'>
                    <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>Imprint: {bookInstance.Imprint}</h5>
                    </Link>
                </Col>
                <p className='py-4 text-light'>Status: {INSTANCE_MAPPING[bookInstance.Status]}</p>
                {Object.prototype.hasOwnProperty.call(bookInstance, 'AvailableBy') 
                && bookInstance.AvailableBy 
                && <p>Available By: {format(new Date(bookInstance.AvailableBy), 'dd MMMM yyyy')}</p>}
            </Row>
        </Container>
    );
};

export default BookInstanceDetail;