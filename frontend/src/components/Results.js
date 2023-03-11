import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/table.css';
import { resultsActions } from '../redux/actions/results.actions';

import Container from 'react-bootstrap/Container';
import Header from './Header'

function Results() {
    const dispatch = useDispatch();
    const { data, } = useSelector(state => ({ ...state.resultsState }));
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15

    useEffect(() => {
        setLoading(true)
        dispatch(resultsActions());
        setLoading(false)
    }, [dispatch])

    const totalPages = Math.ceil(data && data.length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentData = data && data.slice(startIndex, endIndex);


    return (
        <div>
            <Container>
                <Header />
                {loading ? (
                    <p>Loading...</p>
                ) : (<div>
                    < Table responsive className='results-table' size="sm">
                        <thead>
                            <tr>
                                <th># &#9653; </th>
                                <th>TEAM NAME</th>
                                <th>MP</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>G</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData &&
                                currentData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.Poll_Ranking_8}</td>
                                        <td><a href="#">{row.team_name}</a></td>
                                        <td>{row.number_matches}</td>
                                        <td>{row.wins}</td>
                                        <td>{row.draws}</td>
                                        <td>{row.losses}</td>
                                        <td>{row.total_goals}</td>
                                    </tr>
                                ))}
                        </tbody>

                    </Table>
                    <Pagination>
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => handleClick(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
                )}
            </Container>
        </div >
    );
}

export default Results;
