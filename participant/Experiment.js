import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

import { getText } from './Text'

const mapStateToProps = ({ sequence, question1, question2 }) => ({
  sequence, question1, question2
})

class Experiment extends Component {
  constructor(props) {
    super(props)
  }

  next() {
    const { sequence, question1, question2 } = this.props
    if(sequence == "question1") sequence = "question2"
    else if(sequence == "question2") sequence = "answered"
  }
  
  render() {
    const { sequence } = this.props
    const Text = getText(sequence)
    return <div>
      <div>Text.text</div>
      <RadioButtonGroup
        name="question"
      >
        {Text.question.map((type, key) => <RadioButton
          key={key+1}
          value={type}
          label={type}
        />)}
      </RadioButtonGroup>
    </div>
  }
}

export default connect(mapStateToProps)(Experiment)
