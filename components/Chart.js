import React from 'react'
import { connect } from 'react-redux'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

const mapStateToProps = ({}) => ({})

const Chart = ({ oneone, onetwo, twoone, twotwo }) => {
  return (
    <Card>
      <span>
        <Highcharts
          config={{
              chart: {
                type: 'pie'
            },
            credits : {
              enabled: false,
            },
            title: {
                text: 'はじめの質問で1を選んだ人'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.0f}人'
                    }
                }
            },  
  
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}人</b> of total<br/>'
            },
            series: [{
                name: '回答',
                colorByPoint: true,
                data: [{
                    name: '次の質問で1を選んだ',
                    y: oneone,
                }, {
                    name: '次の質問で2を選んだ',
                    y: onetwo,
                }]
            }]
        }} />
        <Highcharts
          config={{
              chart: {
                type: 'pie'
            },
            credits : {
              enabled: false,
            },
            title: {
                text: 'はじめの質問で2を選んだ人'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.0f}人'
                    }
                }
            },  
  
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}人</b> of total<br/>'
            },
            series: [{
                name: '回答',
                colorByPoint: true,
                data: [{
                    name: '次の質問で1を選んだ',
                    y: twoone,
                }, {
                    name: '次の質問で2を選んだ',
                    y: twotwo,
                }]
            }]
        }} />
      </span>
    </Card>
  )
}

export default connect()(Chart)