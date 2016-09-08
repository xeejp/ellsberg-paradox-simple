import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'

import { nextQuestion } from './actions'

const mapStateToProps = ({ sequence, qswap, question_text, bingo }) => ({
  sequence, qswap, question_text, bingo
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
    const { sequence, qswap, question_text, bingo } = this.props
    const Question = question_text["question"]
    const Text = question_text[sequence]
    return (sequence != "answered")?
      <div style={{height: 'auto'}}>
        {Question.text.split('\n').map( line => <h5>{line}</h5>)}
        <SwipeableViews index={this.state.slideIndex} disabled={true}>
          <div style={{overflow: 'hidden'}}>
            {Text.text.split('\n').map( line => <p>{line}</p>)}
            <RaisedButton onClick={this.next.bind(this, 1)} style={{float:  'left', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
              <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
                <h5>{Text.title[0]}</h5>
                {Text.question[0].split('\n').map( line => <p>{line}</p>)}
              </div>
            </RaisedButton>
            <RaisedButton onClick={this.next.bind(this, 2)} style={{float: 'right', width: '40%', height: '300px', position: 'relative', margin: '5%'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
              <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
                <h5>{Text.title[1]}</h5>
                {Text.question[1].split('\n').map( line => <p>{line}</p>)}
              </div>
            </RaisedButton>
          </div>
          <div style={{overflow: 'hidden'}}>
            {Text.text.split('\n').map( line => <p>{line}</p>)}
            <RaisedButton onClick={this.next.bind(this, 1)} style={{float:  'left', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
              <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
                <h5>{Text.title[0]}</h5>
              </div>
            </RaisedButton>
            <RaisedButton onClick={this.next.bind(this, 2)} style={{float: 'right', width: '40%', height: '300px', position: 'relative', margin: '5%'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
              <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
                <h5>{Text.title[1]}</h5>
              </div>
            </RaisedButton>
          </div>
        </SwipeableViews>
      </div>
    : <div>
      {(bingo)? <p>{Text.bingo}</p> : <p>{Text.nbingo}</p>}
      {Text.text.split('\n').map( line => <p>{line}</p>)}
      </div>
  }
}

export default connect(mapStateToProps)(Experiment)
