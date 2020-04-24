import React from 'react';
import {Col} from 'react-bootstrap';
import CaseChart from './CaseChart'
function CaseData(props) {
    var changeInNumberFromPrevDay = props.data[props.data.length-1]-props.data[props.data.length-2];
    var sign = changeInNumberFromPrevDay > 0? "+" :
    changeInNumberFromPrevDay < 0 ? "-" : "";
    return (
        <Col md={2} sm={4} xs={4} className={props.class}>
            {props.data[props.data.length-1]}<br /> 
            {props.title}
            <div>[{sign}{Math.abs(changeInNumberFromPrevDay)}]</div>
            <CaseChart chartData={props.data} dates ={props.dates} color="#005C25"/>
        </Col>
    )
}

export default CaseData;