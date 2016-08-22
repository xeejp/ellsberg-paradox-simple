import React from 'react'
import { connect } from 'react-redux'

import Highcharts from 'react-highchars'

const mapStateToProps = ({ participants }) => ({ participants })

const Chart = ({ participants }) => {
  const users = Object.keys(participants).length()
  var rationally = 0
  for(var i of participants) {
    if(Math.abs(participants[i].question1 - participants[i].question2) == 0)
      rationally++
  }
  return (
    <Highcharts
      config={{
        chart: {
            type: 'column'
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
            name: '実験結果',
            colorByPoint: true,
            data: [{
                name: '合理的な選択をした人',
                y: 1,
            }, {
                name: '合理的な選択をしなかった人',
                y: 1,
            }]
        }]
    }}
    />
  )
}

export default connect(mapStateToProps)(Chart)