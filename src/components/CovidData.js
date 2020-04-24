import React from 'react';
import CountryData from './CountryData';
import { Container, Row, Col, Button} from 'react-bootstrap'
import SelectBox from './SelectBox';

export default class CovidData extends React.Component {
    constructor() {
        super();
        this.state = {
            countryArr: [],
            data: {},
            worldStats: {},
            selectedCounty: "",
           }
        this.getData = this.getData.bind(this);
        this.backToGlobalNumbers = this.backToGlobalNumbers.bind(this);
        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                var worldStats = { confirmed: 0, recovered: 0, deaths: 0 };
                var countryArr = Object.keys(data).map(i => i);
                countryArr.forEach((country) => {
                    let countryData = data[country];
                    // pick last object for today data
                    countryData = countryData[countryData.length - 1];
                    worldStats.confirmed += countryData.confirmed;
                    worldStats.recovered += countryData.recovered;
                    worldStats.deaths += countryData.deaths;
                });
                // world data
                var worldChart = [];
                countryArr.forEach((country) => {
                    let countryData = data[country];
                    countryData.forEach((dailyData, index) => {
                        if (worldChart[index] === undefined) {
                            var worldStats = { date: dailyData.date, confirmed: dailyData.confirmed, recovered: dailyData.recovered, deaths: dailyData.deaths };
                            worldChart.push(worldStats);
                        } else {
                            worldChart[index].confirmed += dailyData.confirmed;
                            worldChart[index].recovered += dailyData.recovered;
                            worldChart[index].deaths += dailyData.deaths;
                        }
                    });

                });
                this.setState({
                    countryArr: countryArr,
                    data: data,
                    worldStats: worldStats,
                    worldChart: worldChart,
                });
            });

    }



    getData(event) {
        var country = event.target.value;
        if (country !== "select") {
            this.setState({
                selectedCountry: country,
            });
        } else {
            this.setState({
                selectedCountry: "",
            })
        }
    }

    backToGlobalNumbers() {
        this.setState({
            selectedCountry: "",
        })
    }
    render() {
        const countryStats = this.state.data[this.state.selectedCountry];
        const worldChart = this.state.worldChart;
        const lastUpdated = worldChart!==undefined?worldChart[worldChart.length-1].date:"";
        return (
            <Container fluid style={{ backgroundColor: '#f8f8ff', padding: 0 }} className="App">
                {/*Header starts here */}
                <Row className="App-header">
                    <Col md={3} style={{ textAlign: 'left' }}>
                        Covid19 Visuals
                    </Col>
                    {/*Select Box for country search ends here */}
                    <SelectBox onChangeFunction={this.getData} countryArr={this.state.countryArr} selectedValue={this.state.selectedCountry}/>
                </Row>
                {/*Header ends here */}
                <Row>
                     {/*Get back to global numbers */}
                    <Col md={{span:1}} xs={1}>
                    {this.state.selectedCountry ? 
                         <Button className='back' onClick={this.backToGlobalNumbers}>Back</Button>
                  : <></>}
                  {/*Last updated */}
                    </Col> 
                    <Col md={{span:2, offset:9}} xs={{span:6 , offset:5}} style={{fontSize: 14, marginTop:12}} > 
                        Last Updated: {lastUpdated}
                    </Col>
                   
                </Row>
                <Container fluid>
                    {this.state.selectedCountry ? 
                        <CountryData stats={countryStats} selectedCountry={this.state.selectedCountry} /> : 
                        <CountryData stats={worldChart} selectedCountry="Global Numbers"/>
                        }
                        
                </Container>
                <footer>
                    <Row className="App-footer">
                        <Col md={2} xs={5}>
                            Created by <a href="https://github.com/workaholic7/covid19visuals" target="_blank">workaholic7</a>
                        </Col>
                        <Col md={{span:1, offset:9}} xs={{span:3, offset:4}}>
                            <a href="https://github.com/pomber/covid19">Datasource</a>
                        
                        </Col>
                    </Row>
                </footer>
            </Container>
        )
    }

}