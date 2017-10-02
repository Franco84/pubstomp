
export default (state=[], action) => {
  switch (action.type) {
    case 'SIGNUP':
      return action.payload.data.jwt
    case 'LOGIN':
      return action.payload
    case 'LOGOUT_USER':
      return action.payload
    default:
      return state
  }
}
