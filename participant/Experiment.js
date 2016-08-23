import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

import { nextQuestion } from './actions'

import { getText } from './Text'

const mapStateToProps = ({ sequence, question1, question2, qswap }) => ({
  sequence, question1, question2, qswap
})

class Experiment extends Component {
  constructor(props) {
    super(props)
    this.state = { selected1: 0, selected2: 0 }
  }

  change1(event, value) {
    this.setState({
       selected1: value
    })
  }

  change2(event, value) {
    this.setState({
       selected2: value
    })
  }

  next() {
    if(this.state.selected1 != 0 && this.state.selected2 != 0) {
      const{ dispatch } = this.props
      dispatch(nextQuestion({ selected1: this.state.selected1, selected2: this.state.selected2 }))
      this.setState({
        selected1: 0,
        selected2: 0
      })
    }
  }
  
  render() {
    const { sequence, qswap } = this.props
    const Text1 = getText('question1', qswap)
    const Text2 = getText('question2', qswap)
　　const Text3 = getText( 'answered', qswap)
    return (sequence != "answered")? <div>
      <span>
        <Card>
          <CardTitle title={Text1.text} />
            <RadioButtonGroup
            name="question1"
            onChange={this.change1.bind(this)}
          >
            {Text1.question.map((type, key) => <RadioButton
              key={key+1}
              value={key+1}
              label={type}
            />)}
          </RadioButtonGroup>
        </Card>
        <Card>
          <CardTitle title={Text2.text} />
            <RadioButtonGroup
            name="question1"
            onChange={this.change2.bind(this)}
          >
            {Text2.question.map((type, key) => <RadioButton
              key={key+1}
              value={key+1}
              label={type}
            />)}
          </RadioButtonGroup>
        </Card>
      </span>
      <RaisedButton label="送信" onClick={this.next.bind(this)} />
    </div>
    : <div><p>{Text3.text}</p></div>
  }
}

export default connect(mapStateToProps)(Experiment)
