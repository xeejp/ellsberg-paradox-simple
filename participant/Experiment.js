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
    console.log("onChange")
    this.setState({
       selected: value
    })
  }

  next() {
    const { question1, question2, sequence } = this.props
    if(this.state.selected != 0) {
      console.log("selected")
      const{ dispatch } = this.props
      console.log("al;dksjfalskjdfa;sdjfa;lkjdf;akj;j " + this.state.selected)
      dispatch(nextQuestion(this.state.selected))
      this.setState({
        selected: 0,
      })
    }
  }
  
  render() {
    const { sequence } = this.props
    const Text = getText(sequence)
    return (sequence != "answered")? <div>
      <p>{Text.text}</p>
        <RadioButtonGroup
        name="question"
        onChange={this.change.bind(this)}
      >
        {Text.question.map((type, key) => <RadioButton
          key={key+1}
          value={key+1}
          label={type}
        />)}
      </RadioButtonGroup>
      <RaisedButton label="Next" onClick={this.next.bind(this)} />
    </div> : <div><p>{Text.text}</p></div>
  }
}

export default connect(mapStateToProps)(Experiment)
