import { connect } from 'react-redux'

const mapStateToProps = ({ question_text }) => ({
  question_text
})

const getText = (sequence, qswap = false) => {
  const { question_text } = this.props
  return question_text[sequence]
}

export default connect(mapStateToProps)(getText)