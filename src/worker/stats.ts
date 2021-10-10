import { get_mock_user } from '../client/data'

export const handleStatsIndex = async () => {
  const users = []
  for (let i = 10; i < 20; i++) {
    users.push(get_mock_user(i))
  }
  const resp = JSON.stringify(users)

  return new Response(resp, {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}

export const handleStats = async ({ params: { id: user_id } }: { params: { id: string } }) => {
  const resp = JSON.stringify(get_mock_user(Number(user_id) || 99999))

  return new Response(resp, {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}
