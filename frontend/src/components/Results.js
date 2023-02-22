import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownDown from './DropdownClass';
import '../styles/table.css';
import resultsActions from '../redux/actions/results.actions';

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
            <Table responsive className='results-table' size="sm">
                <thead>
                    <tr>
                        <th>Team Standings</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th><DropdownDown name="Gender" itemList={["Male", "Female"]} /></th>
                        <th>
                            <DropdownDown name="Season/Year" itemList={[2020, 2021, 2022]} />
                        </th>
                    </tr>
                    <tr>
                        <th># &#9653; </th>
                        <th>TEAM NAME</th>
                        <th>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>G</th>
                        <th>PTS</th>
                        <th>FORM</th>
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
                                <td>{row.points}</td>
                                <td>{row.form}</td>
                            </tr>
                        ))}
                </tbody>

            </Table>
        </div>
    );
}

export default Results;
