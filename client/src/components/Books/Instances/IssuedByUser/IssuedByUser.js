import React, { useEffect, useState } from "react";
import { ListGroup, Col } from "react-bootstrap";
import axios from "axios";

const IssuedByUser = ({ byMe, userId = null }) => {
    const [books, setBooks] = useState({});

    useEffect(() => {
        console.log("HERE");
        let url = byMe ? "/bookinstances/issued-by-me" : `/bookinstances/user/${userId}`;
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                setBooks(response.data);
            })
            .catch((err) => {
                console.log(err.message);
                setBooks({});
            });
    }, [byMe, userId]);

    return (
        <Col className='bg-dark-purple text-light pt-4 pb-5 px-5 mb-5 mx-3 rounded-md text-break shadow-md-screen justify-content-center rounded'>
            <h2 className="gradient-text mb-3">Books Issued By {byMe ? "You" : userId}</h2>
            {Object.keys(books).length === 0 ? (
                <p className="lead slab-font fw-bold oscillate">No Books Issued</p>
            ) : (
                <ListGroup>
                    {books.map((book, index) => (
                        <ListGroup.Item key={index} className="bg-dark-purple pt-4 text-light mx-md-5">
                            <h3>{book.book.Title}</h3>
                            <p>Imprint: {book.Imprint}</p>
                            <p>Due Date: {book.AvailableBy.split('T')[0]}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
    );
};

export default IssuedByUser;