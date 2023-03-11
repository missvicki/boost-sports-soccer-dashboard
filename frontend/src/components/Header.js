import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownDown from './DropdownClass';

function Header() {
    return (
        <Container>
            <Row>
                <Col><h1>Team Standings</h1></Col>
            </Row>
            <Row>
                <Col><DropdownDown name="Gender" itemList={["Men", "Women"]} /></Col>
                <Col><DropdownDown name="Season/Year" itemList={[2020, 2021, 2022]} /></Col>
                <Col><DropdownDown name="Week" itemList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]} /></Col>
            </Row>
        </Container>
    );
}

export default Header;


