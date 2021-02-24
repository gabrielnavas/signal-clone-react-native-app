import env from '../../../../env'

export default async ({ token, nameChat, }) => {
  const pathURL = `${env.backend_point}/chat`
  const payload = { nameChat }
  const responseHttp = await fetch(pathURL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify(payload)
  })

  if (responseHttp.status !== 200) {
    const error = (await responseHttp.json()).error
    return { error }
  }
  const resp = await responseHttp.json()
  console.log(resp.body);
  const newChat = resp.body
  return {
    body: newChat
  }
}