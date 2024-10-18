import { takeEvery, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';
import { API_URL } from '../../utils/constant'
import commonActions from '../Common/actions';


const MessengerSaga = function* () {
    yield all([
        yield takeEvery(actions.USER_LOGIN, userLogin),
    ]);
};

const userLogin = function* (data) {
    const { userData, history } = data;
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/admin`,
                JSON.stringify(userData), {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            )
        )
        if (result?.data === true) {
            yield put({ type: actions.SET_AUTHETICATION, payload: true });
            yield put({ type: commonActions.SET_COMMON_TOASTER_ALERT, payload: { open: true, message: 'login successfully', status: "success" } });
        } 

    } catch (err) {
        console.log(err)
        yield put({ type: commonActions.SET_COMMON_TOASTER_ALERT, payload: { open: true, message: 'Invalid Credentials', status: "failed" } });
        // toast.error('user or password error')
    }
}





export default MessengerSaga;