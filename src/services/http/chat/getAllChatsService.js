import env from '../../../../env'

export default async ({ token }) => {
  const pathURL = `${env.backend_point}/chat`
  const responseHttp = await fetch(pathURL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    method: "GET",
  })

  if (responseHttp.status !== 200) {
    const error = (await responseHttp.json()).error
    return { error }
  }
  const resp = await responseHttp.json()
  const chatsList = resp.body
  return {
    body: chatsList
  }
}