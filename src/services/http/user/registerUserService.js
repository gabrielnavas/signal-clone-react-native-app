import env from '../../../../env'
import { makeUser } from '../../../models/user'


export default async (userParams) => {
  const pathURL = `${env.backend_point}/register`
  const user = makeUser(userParams)
  const responseHttp = await fetch(pathURL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(user)
  })
  if (responseHttp.status !== 200) {
    return { error: await responseHttp.json() }
  }
  const token = await responseHttp.json()

  return {
    body: {
      user,
      token
    }
  }
}