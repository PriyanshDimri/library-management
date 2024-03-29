import React, { useState } from "react";
import {
ListGroup,
Row,
Col,
Button
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import axios from "axios";
import BooksSearch from "../Books/BooksSearch/BooksSearch";
import SearchResult from "../Books/BooksSearch/SearchResult";
import UsersSearch from "../Users/UsersSearch/UsersSearch";
import UsersSearchResult from "../Users/UsersSearch/SearchResult";

const LibrarianDashboard = () => {
const [results, setResults] = useState(null);
const [users, setUsers] = useState(null);

const onSearch = (query, setIsLoading) => {
    axios
    .get(`/books/search/${query}`)
    .then((response) => {
        setResults(response.data);
    })
    .catch(() => {
        setResults({});
    })
    .finally(()=>{
        setIsLoading(false);
    })
};

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
    <>
    <Row className="justify-content-around my-5 mx-4">
        <Col md={6}>
            <Link to="/issue-book">
                <Button variant="primary" className="my-2 py-3 rounded-pill w-100 text-light fw-bold">ISSUE BOOK</Button>
            </Link>
        </Col>
        <Col md={6}>
            <Link to="/reserve-book-librarian">
                <Button variant="primary" className="my-2 py-3 rounded-pill w-100 text-light fw-bold">RESERVE BOOK</Button>
            </Link>
        </Col>
        <Col md={6}>
            <Link to="/receive-book">
                <Button variant="primary" className="my-2 py-3 rounded-pill w-100 text-light fw-bold">RECEIVE BOOK</Button>
            </Link>
        </Col>
        <Col md={6}>
            <Link to="/all-books">
                <Button variant="primary" className="my-2 py-3 rounded-pill w-100 text-light fw-bold">MANAGE BOOKS</Button>
            </Link>
        </Col>
    </Row>
    <hr />
    <h1 className="d-flex align-items-center justify-content-center">Search Books<Search color="#2A2A84" size={36} className="ms-2"/></h1>
    <div className="d-flex justify-content-center my-4 px-md-5">
        <BooksSearch
        onSearch={onSearch}
        onClear={() => {
            setResults(null);
        }}
        />
    </div>
    <div className="d-flex justify-content-center my-3">
        <ListGroup className="my-2 mx-md-5 px-md-5">
        {results ? (
            Object.keys(results).length > 0 ? (
            Object.values(results).map((result, index) => (
                <SearchResult result={result} key={index} />
            ))
            ) : (
            <SearchResult result={null} key={1} />
            )
        ) : (
            ""
        )}
        </ListGroup>
    </div>
    <hr />
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
    </>
);
};

export default LibrarianDashboard;
