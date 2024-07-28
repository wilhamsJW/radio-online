import { SET_AUTHENTICATED_USER } from '../actions/authenticatedUser';
import { SET_NEW_AUTHENTICATED_USER } from '../actions/registerNewAuthenticatedUser';

interface authenticatedReducer {
  isAuthenticated?: boolean;
  isNewAuthenticated?: boolean
}

const initialState: authenticatedReducer = {
  isAuthenticated: false,
  isNewAuthenticated: false
};

const authenticatedUserReducer = (state = initialState, action: any ): authenticatedReducer => {
  console.log('value reducer',  action.payload);
  switch (action.type) {
    case SET_AUTHENTICATED_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SET_NEW_AUTHENTICATED_USER:
      return {
        ...state,
        isNewAuthenticated: action.payload
      }
    default:
      return state;
  }
};

export default authenticatedUserReducer;