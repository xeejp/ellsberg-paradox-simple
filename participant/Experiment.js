import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'

import { nextQuestion } from './actions'

import { getText } from './Text'

const mapStateToProps = ({ sequence, qswap }) => ({
  sequence, qswap
})

class Experiment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
  }

  next(value) {
    const{ dispatch } = this.props
    dispatch(nextQuestion(value))
    this.setState({
      slideIndex: 1
    })
  }
  
  render() {
    const { sequence, qswap } = this.props
    const Question = getText("question")
    const Text = getText(sequence, qswap)
    return (sequence != "answered")?
      <div style={{height: 'auto'}}>
        <h5>{Question.text}</h5>
        <SwipeableViews index={this.state.slideIndex} disabled={true}>
          <div>
            <p>{Text.text}</p>
            <RaisedButton label={Text.question[0]} onClick={this.next.bind(this, 1)} style={{float:  'left', width: '48%', height: '300px', position: 'relative'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}} />
            <RaisedButton label={Text.question[1]} onClick={this.next.bind(this, 2)} style={{float: 'right', width: '48%', height: '300px', position: 'relative'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}} />
          </div>
          <div>
            <p>{Text.text}</p>
            <RaisedButton label={Text.question[0]} onClick={this.next.bind(this, 1)} style={{float:  'left', width: '48%', height: '300px', position: 'relative'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}} />
            <RaisedButton label={Text.question[1]} onClick={this.next.bind(this, 2)} style={{float: 'right', width: '48%', height: '300px', position: 'relative'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}} />
          </div>
        </SwipeableViews>
      </div>
    : <div><p>{Text.text}</p></div>
  }
}

export default connect(mapStateToProps)(Experiment)
