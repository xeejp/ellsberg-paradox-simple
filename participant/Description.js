import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

const mapStateToProps = ({ question_text }) => ({
  question_text
})

const Description = ({ question_text }) => (
  <Card>
    <CardTitle title="エルスバーグのパラドクス(簡易版)" subtitle="ルールの説明" />
    <CardText>
      {question_text['description_text'].split('\n').map( line => <p>{line}</p>)}
    </CardText>
  </Card>
)
export default connect(mapStateToProps)(Description)