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
    var rational = 0
    let user = 0
    if(participants != undefined){
      user = Object.keys(participants).length
      console.log(user)
      for(var i in participants) {
        if(participants[i].question2 == 0){
          user--
        }
        else if(Math.abs(participants[i].question1 - participants[i].question2) == 0)
          rational++
      }
    }
    if (loading) {
      return <p>ロード中です。</p>
    } else {
      return (
        <div>
          <PageButtons />
          <Information />
          <div><Chart rational={rational} irational={user - rational} /><p></p></div>
          <Users />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
