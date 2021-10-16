import { sql, db_client } from '../../submodules/campaigns-worker/src/db'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec']
const pad2 = (x: number) => (x < 10 ? `0${x}` : x)

const resp_if_changed = async (headers: Headers, resp: Response, last_modified: string) => {
  const digestArray = await crypto.subtle.digest({ name: 'SHA-1' }, await resp.clone().arrayBuffer())
  const digest = btoa(String.fromCharCode(...new Uint8Array(digestArray)))
  const if_none_match = headers.get('If-None-Match')
  if (if_none_match === digest) {
    return new Response(null, { status: 304 })
  }
  const etagged_resp = new Response(resp.body, resp)
  etagged_resp.headers.set('Etag', digest)
  etagged_resp.headers.set('Last-Modified', last_modified)
  return etagged_resp
}

const get_badge = async ({ params: { id: user_id }, headers }: { params: { id: number }; headers: Headers }) => {
  const client = db_client()
  const call = sql(`
    SELECT total_donated, pg_xact_commit_timestamp(xmin)
    FROM impact
    WHERE campaign_id = 1 AND user_id = ${user_id}
  `)
  const { records } = await client.send(call)
  if (!records) {
    return new Response(`DB call failed`, { status: 500 })
  } else if (records.length === 0) {
    return new Response(`No badge found for user ${user_id}`, { status: 404 })
  }
  const total_donated = Number(records[0][0].stringValue)
  const lm = new Date(records[0][1].stringValue!)
  const if_modified_since = headers.get('If-Modified-Since')
  if (if_modified_since && new Date(if_modified_since) > lm) {
    return new Response(null, { status: 304 })
  }
  const lmh = `${DAYS[lm.getUTCDay()]}, ${pad2(lm.getUTCDate())}, ${
    MONTHS[lm.getUTCMonth()]
  } ${lm.getUTCFullYear()} ${pad2(lm.getUTCHours())}:${pad2(lm.getUTCMinutes())}:${pad2(lm.getUTCSeconds())} GMT`
  const cache = await caches.open('campaign_badges')
  const cache_hit = await cache.match(`https://fastprize.org/badge/${user_id}/${total_donated}`)
  if (cache_hit) {
    return await resp_if_changed(headers, cache_hit, lmh)
  }

  let int_array
  try {
    const client = new LambdaClient({
      // @ts-ignore
      region: AWS_REGION,
      credentials: {
        // @ts-ignore
        accessKeyId: LAMBDA_ACCESS_KEY_ID,
        // @ts-ignore
        secretAccessKey: LAMBDA_SECRET_ACCESS_KEY
      }
    })
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const cmd = new InvokeCommand({
      // @ts-ignore
      FunctionName: LAMBDA_NAME,
      Payload: encoder.encode(JSON.stringify({ user_id, total_donated, campaign_id: 1 }))
    })
    const res = await client.send(cmd)
    const decoded_res = decoder.decode(res.Payload)
    const b64 = JSON.parse(decoded_res).body.replace(/[\s"]/g, '')
    const byte_string = atob(b64)
    const array_buffer = new ArrayBuffer(byte_string.length)
    int_array = new Uint8Array(array_buffer)
    for (var i = 0; i < byte_string.length; i++) {
      int_array[i] = byte_string.charCodeAt(i)
    }
  } catch (e) {
    return new Response((e as any).toString(), { status: 500 })
  }
  const resp = new Response(int_array!, {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'image/png'
    }
  })
  const resp_to_cache = new Response(resp.body, resp)
  resp_to_cache.headers.set('Cache-Control', 'max-age=31536000')
  await cache.put(`https://fastprize.org/badge/${user_id}/${total_donated}`, resp_to_cache.clone())
  return resp_if_changed(headers, resp_to_cache, lmh)
}

export default get_badge
