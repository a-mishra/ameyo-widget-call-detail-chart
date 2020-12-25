import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts'

function Chart(props) {

    useEffect(() => {
        //effect
        let series = [{
            name: 'Connected',
            y: props.connected,
          }, {
            name: 'Abandoned at IVR',
            y: props.abandonedIVR
          }, {
            name: 'Abandoned at ACD',
            y: props.abandonedACD
          }];
        renderChart(series, props.offered);
        return () => {
            //cleanup
            // Nothing for now
        }
    }, [props.connected, props.abandonedIVR, props.abandonedACD, props.offered])


    const renderChart = (series, title) => {
        Highcharts.chart('callStatsChart', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
              height:window.innerHeight*0.90
            },
            title: {
              text: null
            },
            // title: {
            //     text: title,
            //     align: 'center',
            //     verticalAlign: 'middle',
            //     y: 0
            // },
            tooltip: {
              pointFormat: '{point.y} | (<b>{point.percentage:.1f}%</b>)'
            },
            accessibility: {
              point: {
                valueSuffix: '%'
              }
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: ['#3597D3','#FBCB43','#E64535'],
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b> <br/>  {point.y}  ({point.percentage:.1f} %)'
                },
                showInLegend: true
              }
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical',
                x: 0,
                y: 0,
                itemStyle: {
                  textShadow: 'none'
                },
                itemHoverStyle: {
                    textShadow: '#FC0 1px 0 10px',
                    fontSize: "14px",
                },
                labelFormatter: function () {
                    return this.name;
                },
                textOverflow: "ellipsis",
                itemMarginBottom:10
              },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                innerSize: '50%',
                data: series
              }]
          });
    }


    return (
        <div>
            <div id="callStatsChart"></div>
        </div>
    )
}

export default Chart
