import React from 'react'
import { connect } from 'react-redux'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

const mapStateToProps = ({}) => ({})

const Chart = ({ rational, irational }) => {
  return (
    <Card>
    <Highcharts
      config={{
        chart: {
            type: 'column'
        },
        credits : {
          enabled: false,
        },
        title: {
            text: '実験結果'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: '人数'
            },
            allowDecimals: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}人'
                }
            }
         },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}人</b><br/>'
        },
         series: [{
            name: '回答',
            colorByPoint: true,
            data: [{
                name: '合理的な回答をした人',
                y: rational,
            }, {
                name: '非合理的な回答をした人',
                y: irational,
            }]
        }]
    }} /> </Card>
  )
}

export default connect()(Chart)