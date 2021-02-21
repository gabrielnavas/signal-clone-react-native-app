import env from '../../../env'
import { makeUserLogin } from '../../models/user'

export default async ({ email, password }) => {
  const pathURL = `${env.backend_point}/login`
  const userModel = makeUserLogin({ email, password })
  const responseHttp = await fetch(pathURL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(userModel)
  })

  if (responseHttp.status !== 200) {
    const error = (await responseHttp.json()).error
    return { error }
  }
  const { token, user } = await responseHttp.json()
  return {
    body: {
      user,
      token
    }
  }
}