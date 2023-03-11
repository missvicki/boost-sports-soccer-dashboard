import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownDown from './DropdownClass';
import '../styles/table.css';
import resultsActions from '../redux/actions/results.actions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Results() {
    const dispatch = useDispatch();
    const { fetchResults } = resultsActions(dispatch);

    const { standings, } = useSelector(state => ({ ...state.resultsState }));

    useEffect(() => {
        async function fetchTeamStandings() {
            Promise.all([fetchResults()])
        }
        fetchTeamStandings()
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <Col><h1>Team Standings</h1></Col>
                </Row>
                <Row>
                    <Col><DropdownDown name="Gender" itemList={["Men", "Women"]} /></Col>
                    <Col><DropdownDown name="Season/Year" itemList={[2020, 2021, 2022]} /></Col>
                    <Col><DropdownDown name="Week" itemList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]} /></Col>
                </Row>
                <Table responsive className='results-table' size="sm">
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
                        {standings.length > 0 &&
                            standings.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.rank}</td>
                                    <td><a href="#">{row.team_name}</a></td>
                                    <td>{row.matches_played}</td>
                                    <td>{row.wins}</td>
                                    <td>{row.draws}</td>
                                    <td>{row.losses}</td>
                                    <td>{row.goals}</td>
                                </tr>
                            ))}
                    </tbody>

                </Table>
            </Container>
        </div>
    );
}

export default Results;
