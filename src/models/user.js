
export const makeUserWithToken = (user, token) => ({
  name: user.name,
  email: user.email,
  password: user.password,
  imageURL: user.imageURL,
  token
})


export const makeUser = userParams => {

  const userMaked = {
    name: userParams.name,
    email: userParams.email,
    password: userParams.password,
  }
  if (userParams.imageURL) {
    userMaked.imageURL = userParams.imageURL
  }
  return userMaked
}

export const makeUserLogin = ({email, password}) => ({
  email, password
})