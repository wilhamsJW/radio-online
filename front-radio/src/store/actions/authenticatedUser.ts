export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';

export const authenticatedUserAction = (value: Boolean) => {
  console.log('value action', value);

  return {
    type: SET_AUTHENTICATED_USER,
    payload: value,
  }
};

/** Um boa prática para projetos grandes é cada actions ou um grupo 
 * actions estarem dentro do mesmo arquivo se elas tiverem o mesmo contexto
 * pois isso facilta manutenção
 */