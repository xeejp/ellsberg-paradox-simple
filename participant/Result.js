import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Chart from 'components/Chart'

const mapStateToProps = ({ rational, irational }) => ({
})

const Result = ({ rational, irational}) => (
  <div>
    <Chart rational={rational} irational={irational} />
  </div>
)

export default connect(mapStateToProps)(Result)
