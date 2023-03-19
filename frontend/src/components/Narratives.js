import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LineChart from './Graph';
import { performancesActions } from '../redux/actions/performances.actions';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Narratives() {
    const dispatch = useDispatch();
    const { data, error } = useSelector(state => ({ ...state.performanceState }));
    const [loading, setLoading] = useState(false);
    const textStyle = { color: 'red' };

    const query = useQuery();

    const team = query.get('team');
    const gender = query.get('gender');
    const year = query.get('year');


    useEffect(() => {
        setLoading(true)
        if (gender && year && team &&
            gender != "Select Gender" &&
            year != "Select Year"
            && team != "Select Team") {
            dispatch(performancesActions(gender, year, team));
        } else {
            dispatch(performancesActions())
        }
        setLoading(false)
    }, [team, gender, year])

    if (error) {
        return (
            <div>
                <Container>
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
                <p><Link to="/">Go Back To Table</Link></p>
                <LineChart data={data} team={team} gender={gender} year={year} key={team} />
            </Container>
        </div >
    );


}

export default Narratives;
