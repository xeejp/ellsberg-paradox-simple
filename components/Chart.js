import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

const mapStateToProps = ({}) => ({})

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
    const { oneone, onetwo, twoone, twotwo } = this.props
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
                  text: 'はじめの質問でオプションAを選んだ人'
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
                      name: '次の質問でオプションAを選んだ',
                      y: oneone,
                  }, {
                      name: '次の質問でオプションBを選んだ',
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
                  text: 'はじめの質問でオプションBを選んだ人'
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
                      name: '次の質問でオプションBを選んだ',
                      y: twotwo,
                  }, {
                      name: '次の質問でオプションAを選んだ',
                      y: twoone,
                  }]
              }]
          }} />
        </span>
      </CardText>
    </Card>
  )
  }
}

export default connect()(Chart)