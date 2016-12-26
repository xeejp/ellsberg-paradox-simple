﻿import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import {ReadJSON, LineBreak } from '../util/ReadJSON'

import Pages from './Pages'

const mapStateToProps = ({ loading, active }) => ({
  loading,
  active
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
    const { loading, active } = this.props
    var text = ReadJSON().static_text
    if (loading) {
      return <p>{text["loading"]}</p>
    } else if(active) {
      return (
        <div>
          <Pages />
        </div>
      )
    } else {
      return (
        <div>
          <p>{LineBreak(text["part_app"]["end"])}</p>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
