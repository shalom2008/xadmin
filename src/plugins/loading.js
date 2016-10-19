import LoadingBar, { loadingBarReducer, showLoading, hideLoading } from 'react-redux-loading-bar'
import { REHYDRATE } from 'redux-persist/constants'
import { fork, put, call, cancelled } from 'redux-saga/effects'
import { takeEvery, takeLatest, delay } from 'redux-saga'

export default {
  blocks: {
    'main.top': LoadingBar
  },
  reducers: {
    loadingBar: (state=0, action) => {
      switch (action.type) {
        case REHYDRATE:
          return 0
        default:
          return loadingBarReducer(state, action)
      }
    }
  },
  effects: (app) => function *() {
    yield [
      takeEvery('START_LOADING', function *() {
        yield put(showLoading())
      }),
      takeEvery('END_LOADING', function *() {
        yield put(hideLoading())
      })
    ]
  }
}
