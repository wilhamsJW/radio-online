export const SET_NEW_AUTHENTICATED_USER = 'SET_NEW_AUTHENTICATED_USER';

export const registerNewAuthenticatedUser = (value: Boolean) => {
  console.log('value action SET_NEW_AUTHENTICATED_USER', value);

  return {
    type: SET_NEW_AUTHENTICATED_USER,
    payload: value,
  }
};

/** Um boa prática para projetos grandes é cada actions ou um grupo 
 * actions estarem dentro do mesmo arquivo se elas tiverem o mesmo contexto
 * pois isso facilta manutenção
 */