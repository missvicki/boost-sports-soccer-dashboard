import React, { useState } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';

function Header(props) {
    const handleGenderSelect = (gender) => {
        props.setSelectedGender(gender);
    };

    const handleYearSelect = (year) => {
        props.setSelectedYear(year);
    };

    const handleWeekSelect = (week) => {
        props.setSelectedWeek(week);
    };

    return (
        <Container>
            <Row>
                <Col><h1>
                    {props.selectedYear && props.selectedYear !== "Select Year" ? props.selectedYear : "2022"} - Week {props.selectedWeek && props.selectedWeek !== "Select Week" ? props.selectedWeek : "8"} {props.selectedGender && props.selectedGender !== "Select Gender" ? props.selectedGender : "Women"} Standings
                </h1></Col>
            </Row>
            <Row>
                <Col>
                    <DropdownButton id="dropdown-basic-button" variant='' title={props.selectedGender || 'Select Gender'} onSelect={handleGenderSelect}>
                        {props.genders.map(gender => (
                            <Dropdown.Item key={gender} eventKey={gender}>{gender}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton id="dropdown-basic-button" variant='' title={props.selectedYear || 'Select Year'} onSelect={handleYearSelect}>
                        {props.years.map(year => (
                            <Dropdown.Item key={year} eventKey={year}>{year}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton id="dropdown-basic-button" variant='' title={props.selectedWeek || 'Select Week'} onSelect={handleWeekSelect}>
                        {props.weeks.map(week => (
                            <Dropdown.Item key={week} eventKey={week}>{week}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;


