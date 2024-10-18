import actions from './actions'

const initialState = {
   
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.SET_AUTHETICATION:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        default:
            return state;
    }
};

export default UserReducer;