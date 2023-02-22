import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function DropdownDown(props) {
    const item = props.itemList.map((value, index) =>
        <Dropdown.Item href="#" key={index}>{value}</Dropdown.Item>)
        
    return (
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                {props.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>{item}</Dropdown.Menu>

        </Dropdown>
    )
}

export default DropdownDown;