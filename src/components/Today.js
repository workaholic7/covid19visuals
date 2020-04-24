import React from 'react';
import {Row} from 'react-bootstrap';
import CaseData from './CaseData';

function Today(props) {
    if(props.data && props.data.length!==undefined) {
        let confirmed=[], deaths=[],recovered=[],active=[], dates=[];
        props.data.forEach((data) =>{
            confirmed.push(data.confirmed);
            deaths.push(data.deaths);
            recovered.push(data.recovered);
            active.push(data.confirmed - data.recovered - data.deaths);
            dates.push(data.date);
        })
        return (
            <Row className='today-row justify-content-center'>
                <CaseData class="confirmed"
                    data={confirmed} dates={dates} title="Confirmed" />
    
                <CaseData class="recovered"
                    data={recovered} dates={dates} title="Recovered" />
                
                <CaseData class="deaths"
                    data={deaths} dates={dates} title="Deaths" />
                
                <CaseData class="active"
                    data={active} dates={dates} title="Active" />
                
            </Row>
        )
    }else{
        return (<></>);
    }
    

}


export default Today;