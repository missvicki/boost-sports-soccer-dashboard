import React, { useState } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';

function Header(props) {
    const years_weeks = {
        "men_2020": 19,
        "men_2021": 12,
        "men_2022": 7,
        "women_2020": 19,
        "women_2021": 13,
        "women_2022": 8,
    }

    const handleGenderSelect = (gender) => {
        props.setSelectedGender(gender);
        if (gender === "Select Gender") {
            props.setDisabledYear(true);
        } else {
            if (props.selectedYear) {
                const gender_year = `${gender.toLowerCase()}_${props.selectedYear}`
                const weeks = years_weeks[gender_year]
                props.setWeeks(Array.from({ length: `${weeks}` }, (v, k) => k + 1))
            }
            props.setDisabledYear(false);
        }
    };

    const handleYearSelect = (year) => {
        props.setSelectedYear(year);
        if (year === "Select Year") {
            props.setDisabledWeek(true);
        } else {
            if (props.selectedGender) {
                const gender_year = `${props.selectedGender.toLowerCase()}_${year}`
                const weeks = years_weeks[gender_year]
                props.setWeeks(Array.from({ length: `${weeks}` }, (v, k) => k + 1))
            }
            props.setDisabledWeek(false);
        }
    };

    const handleWeekSelect = (week) => {
        props.setSelectedWeek(week);
    };

    return (
        <Container>
            <Row>
                <Col><h1>
                    {props.selectedYear && props.selectedYear !== "Select Year" ? props.selectedYear : ""} Week {props.selectedWeek && props.selectedWeek !== "Select Week" ? props.selectedWeek : ""} {props.selectedGender && props.selectedGender !== "Select Gender" ? props.selectedGender : ""} Standings
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
                    <DropdownButton disabled={props.disabledYear} id="dropdown-basic-button" variant='' title={props.selectedYear || 'Select Year'} onSelect={handleYearSelect}>
                        {props.years.map(year => (
                            <Dropdown.Item key={year} eventKey={year}>{year}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
                <Col>
                    {props.disabled}
                    <DropdownButton disabled={props.disabledWeek} id="dropdown-basic-button" variant='' title={props.selectedWeek || 'Select Week'} onSelect={handleWeekSelect}>
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


