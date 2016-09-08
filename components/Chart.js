import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

const mapStateToProps = ({ question_text }) => ({ question_text })

class Chart extends Component {
  constructor(props) {
    super(props)
    const { expanded } = this.props
    this.state = { expanded: expanded }
  }
  
  handleExpandChange(expanded) {
    this.setState({ expanded: expanded })
  }
  
  render() {
    const { one, two, question_text } = this.props
    return (
    <Card
      expanded={this.state.expanded}
      onExpandChange={this.handleExpandChange.bind(this)}
    >
      <CardHeader
        title={"実験結果"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <Highcharts config={
               {
             chart: {
                  type: 'column'
              },
              credits: {
                enabled: false
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
                  pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}人/b><br/>'
             },

             series: [{
                 name: '壺',
                 colorByPoint: true,
                 data: [{
                     name: '壺Aを選んだ人',
                      y: one,
                 }, {
                     name: '壺Bを選んだ人',
                      y: two,
                  }]
             }]
          }
        } />
      </CardText>
    </Card>
  )
  }
}

export default connect(mapStateToProps)(Chart)