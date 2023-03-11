import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Table from 'react-bootstrap/Table';
import '../styles/table.css';
import { resultsActions } from '../redux/actions/results.actions';

import Container from 'react-bootstrap/Container';
import Header from './Header'

function Results() {
    const dispatch = useDispatch();
    const { data, } = useSelector(state => ({ ...state.resultsState }));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        dispatch(resultsActions());
        setLoading(false)
    }, [dispatch])


    return (
        <div>
            <Container>
                <Header />
                {loading ? (
                    <p>Loading...</p>
                ) : (
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
                            {data &&
                                data.map((row, index) => (
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
                )}
            </Container>
        </div >
    );
}

export default Results;
