import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import PageButtons from './PageButtons'
import Information from './Information'
import Users from './Users'

import Chart from 'components/Chart'

const mapStateToProps = ({loading, page, participants}) => ({
  loading, page, participants
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { loading, page, participants } = this.props
    var ans = [[0, 0], [0, 0]]
    if(participants != undefined){
      for(var i in participants) {
        if(participants[i].question2 != 0){
          ans[participants[i].question1 - 1][participants[i].question2 - 1]++
        }
      }
    }
    if (loading) {
      return <p>ロード中です。</p>
    } else {
      return (
        <div>
          <PageButtons />
          <Information />
          <div><Chart oneone={ans[0][0]} onetwo={ans[0][1]} twoone={ans[1][0]} twotwo={ans[1][1]} /><p></p></div>
          <Users />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)