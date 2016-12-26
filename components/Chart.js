import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'
import { ReadJSON } from '../util/ReadJSON'

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
    var text = ReadJSON().static_text["comp_chart"]
    if(!question_text) return null
    return (
    <Card
      expanded={this.state.expanded}
      onExpandChange={this.handleExpandChange.bind(this)}
    >
      <CardHeader
        title={text["title"]}
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
                  text: text["title"]
             },
             xAxis: {
                 type: 'category'
             },
              yAxis: {
                 title: {
                      text: text["people"]
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
                         format: '{point.y:.0f}' + text["person_unit"]
                     }
                  }
             },

             tooltip: {
                  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                  pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}' + text["person_unit"] + '</b><br/>'
             },

             series: [{
                 name: text["answer"],
                 colorByPoint: true,
                 data: [{
                     name: question_text["question1"]["title"][0] + text["choice"],
                      y: one,
                 }, {
                     name: question_text["question1"]["title"][1] + text["choice"],
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

export default connect(mapStateToProps)(throttle(Chart, 200))
