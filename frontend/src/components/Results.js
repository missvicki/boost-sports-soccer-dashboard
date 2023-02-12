import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/table.css';

function Results() {

    return (
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
                    <th></th>
                    <th>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                Season / Year
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">2021</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">2022</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
                    <tr></tr>
                </tr>
            </thead>
            <tbody>
                <tr className='align-me'>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr className='align-me'>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr className='align-me'>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
            </tbody>

        </Table>
    );
}

export default Results;
