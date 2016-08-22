import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, match, nextPage, submitPage, changePage, allReset } from './actions'

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${submitPage}`)
    sendData('change page', payload.type)
    console.log("IIIIIII " + payload.type + " " + Object.keys(payload.participants).length())
    if(payload.type == "experiment") yield call(sendData, 'all reset')
    if(payload.type ==     "result") {
      var rationally = 0
      for(var i of payload.participants) {
        if(Math.abs(payload.participants[i].question1 - payload.participants[i].question2) == 0)
          rationally++
      }
      yield call(sendData, 'send result', {rational: rational, irrational: (Object.keys(payload.participants).length() - rational)})
    }
    yield put(changePage(payload.type))
  }
}

function* nextPageSaga() {
  const pages = ["experiment", "result", "waiting"]
  while (true) {
    yield take(`${nextPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 0; i < pages.length; i ++) {
      if (page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    yield put(submitPage({type: next}))
  }
}

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* allResetSaga() {
  while(true) {
    yield take(`${allReset}`)
    yield call(sendData, 'all reset')
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(nextPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(allReset)
}

export default saga
