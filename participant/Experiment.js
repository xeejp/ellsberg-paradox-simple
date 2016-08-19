import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

import { nextQuestion } from './actions'

import { getText } from './Text'

const mapStateToProps = ({ sequence, question1, question2 }) => ({
  sequence, question1, question2
})

class Experiment extends Component {
  constructor(props) {
    super(props)
    this.state = { selected: 0 }
  }

  change(event, value) {
    this.setState({
       selected: value
    })
  }

  next() {
    const { question1, question2, sequence } = this.props
    if(this.state.selected != 0) {
      const{ dispatch } = this.props
      dispatch(nextQuestion(this.state.selected))
      this.setState({
        selected: 0,
      })
    }
  }
  
  render() {
    const { sequence } = this.props
    const Text = getText(sequence)
    return (sequence != "answered")? (sequence == "question1")? <div>
      <p>{Text.text}</p>
        <RadioButtonGroup
        name="question1"
        onChange={this.change.bind(this)}
      >
        {Text.question.map((type, key) => <RadioButton
          key={key+1}
          value={key+1}
          label={type}
        />)}
      </RadioButtonGroup>
      <RaisedButton label="Next" onClick={this.next.bind(this)} />
    </div>
    : <div> <p>{Text.text}</p>
        <RadioButtonGroup
        name="question2"
        onChange={this.change.bind(this)}
      >
        {Text.question.map((type, key) => <RadioButton
          key={key+1}
          value={key+1}
          label={type}
        />)}
      </RadioButtonGroup>
      <RaisedButton label="Next" onClick={this.next.bind(this)} />
    </div>
    : <div><p>{Text.text}</p></div>
  }
}

export default connect(mapStateToProps)(Experiment)
