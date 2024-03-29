import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Container, Row, Col, Table } from 'react-bootstrap';
import '../styles/table.css';
import { resultsActions } from '../redux/actions/results.actions';
import Header from './Header';


function Results() {
    const dispatch = useDispatch();
    const { data, error } = useSelector(state => ({ ...state.resultsState }));
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [genders, setGenders] = useState(["Select Gender", "Men", "Women"]);
    const [years, setYears] = useState(["Select Year", 2020, 2021, 2022]);
    const [weeks, setWeeks] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [disabledYear, setDisabledYear] = useState(true);
    const [disabledWeek, setDisabledWeek] = useState(true);

    const itemsPerPage = 20

    useEffect(() => {
        setLoading(true)
        if (selectedGender && selectedYear &&
            selectedWeek && selectedGender != "Select Gender"
            && selectedYear != "Select Year" && selectedWeek != "Select Week") {
            dispatch(resultsActions(selectedGender, selectedYear, selectedWeek));
        } else {
            dispatch(resultsActions())
        }
        setLoading(false)
    }, [selectedGender, selectedYear, selectedWeek])

    const totalPages = Math.ceil(data && data.length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentData = data && data.slice(startIndex, endIndex);
    const textStyle = { color: 'red' };

    if (error) {
        return (
            <div>
                <Container>
                    <Header
                        genders={genders}
                        years={years}
                        weeks={weeks}
                        selectedWeek={selectedWeek}
                        selectedGender={selectedGender}
                        selectedYear={selectedYear}
                        setSelectedWeek={setSelectedWeek}
                        setSelectedYear={setSelectedYear}
                        setSelectedGender={setSelectedGender}
                        disabledWeek={disabledWeek}
                        setDisabledWeek={setDisabledWeek}
                        disabledYear={disabledYear}
                        setDisabledYear={setDisabledYear}
                        setWeeks={setWeeks}
                    />
                    {loading ? (
                        <div>
                            <Row>
                                <Col>
                                    <p>Loading Data ...</p>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div>
                            <Row>
                                <Col>
                                    <p style={textStyle}>{error}</p>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            </div>
        )
    }

    return (
        <div>
            <Container>
                <Header
                    genders={genders}
                    years={years}
                    weeks={weeks}
                    selectedWeek={selectedWeek}
                    selectedGender={selectedGender}
                    selectedYear={selectedYear}
                    setSelectedWeek={setSelectedWeek}
                    setSelectedYear={setSelectedYear}
                    setSelectedGender={setSelectedGender}
                    disabledWeek={disabledWeek}
                    setDisabledWeek={setDisabledWeek}
                    disabledYear={disabledYear}
                    setDisabledYear={setDisabledYear}
                    setWeeks={setWeeks}
                />
                {loading ? (
                    <p>Loading...</p>
                ) : (<div>
                    < Table responsive className='results-table' size="sm">
                        <thead>
                            <tr>
                                <th># <span>&uarr;</span></th>
                                <th>TEAM NAME</th>
                                <th>MP</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>G</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData && (typeof currentData === 'object') &&
                                currentData.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{row[`Poll_Ranking_${selectedWeek}`]}</td>
                                            <td>
                                                <Link
                                                    to={`${row.team_name}-performance?gender=${selectedGender}&year=${selectedYear}&team=${row.team_name}`}>{row.team_name}
                                                </Link>
                                            </td>
                                            <td>{row.number_matches}</td>
                                            <td>{row.wins}</td>
                                            <td>{row.draws}</td>
                                            <td>{row.losses}</td>
                                            <td>{row.total_goals}</td>
                                        </tr>
                                    );
                                })}

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
                )
                }
            </Container >
        </div >
    );
}

export default Results;
