import React from 'react';
import Charts from './Charts';
import Today from './Today';
import { Container, Row, Col } from 'react-bootstrap'


function CountryData(props) {
    // world data having arrays for dates, confirmed, recovered,active and deaths
    const chartData = props.stats;
    const selectedCountry = props.selectedCountry;
    return (
        <Container fluid>
            <Row>
                <Col md={12} style={{ fontSize: 40, fontWeight: 'bold', padding: 20 }}>
                    {selectedCountry}
                    
                </Col>
            </Row>
            <Today data={chartData} />
            <div style={{ display: !selectedCountry && 'none' }}>
                <Charts chartData={chartData} selectedCountry={selectedCountry} />
            </div>
        </Container>


    )
}

export default CountryData;