import { all } from 'redux-saga/effects'

import UserSagas from './admin/sagas'

export default function* rootSaga() {
    yield all([
        UserSagas()
    ])
}