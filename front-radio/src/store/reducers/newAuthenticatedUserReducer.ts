import { SET_NEW_AUTHENTICATED_USER } from '../actions/registerNewAuthenticatedUser';

interface authenticatedReducer {
  isNewAuthenticated?: boolean
}

const initialState: authenticatedReducer = {
  isNewAuthenticated: false,
};

const newAuthenticatedUserReducer = (state = initialState, action: any ): authenticatedReducer => {
  console.log('value reducer NEW',  action.payload);
  switch (action.type) {
    case SET_NEW_AUTHENTICATED_USER:
      return {
        ...state,
        isNewAuthenticated: action.payload,
      };
    default:
      return state;
  }
};

export default newAuthenticatedUserReducer;

