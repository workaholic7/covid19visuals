import React from 'react';
import Chart from 'chart.js';
import {isEmpty} from "lodash";

export default class CaseChart extends React.Component {
    chartRef = React.createRef();
    constructor(){
        super();
        this.myChart ={};
    }

    componentDidMount(){
        this.createChart(this.props);
    }

    componentDidUpdate(){
        this.createChart(this.props);
    }

    createChart(props) {
        if(props.chartData && props.chartData.length!==undefined){
            let dailyArr = [];
            props.chartData.forEach((element, index) => {
                dailyArr.push(element-props.chartData[index-1])
            });
   
        const myChartRef = this.chartRef.current.getContext("2d");
        if(!isEmpty(this.myChart)) {
            this.myChart.data.datasets[0].data = dailyArr.splice(-20);
          
            this.myChart.update();
        } else{ 
        this.myChart = new Chart(myChartRef, {
            type : "line",
            data : {
                labels: props.dates.splice(-20),
                datasets: [
                    {
                        label: "Confirmed",
                        data : dailyArr.splice(-20), 
                        borderColor : '#4285f4',
                        fill : false,
                       pointRadius : 0
                    }
                ]
            },
            options : {
                animation : {
                    duration : 2000, 
                    easing : 'easeInOutQuint'

                },
                tooltips : {
                    enabled : true,
                    mode : "nearest"
                },
                
                legend : {
                   display : false
                },
                title : {
                    display : false,
                   },
                scales:{
                    xAxes: [
                        {
                            ticks:{
                                display : false
                                },
                                   gridLines: {
                                       display : false
                                   }
                        }
                    ],
                    yAxes: [
                        {
                            ticks:{
                                display : false
                                },
                                   gridLines: {
                                       display : false
                                   }
                        }
                    ]
                }
            }
        })
    }
    }
}



render(){

    return(
        <div>
            <canvas id = "myChart" ref={this.chartRef}
            />
        </div>
        
    )
}
}


