import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'

const get_badge = async ({ params: { id: user_id } }: { params: { id: number } }) => {
  let intArray
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
      FunctionName: 'fastprize-img',
      Payload: encoder.encode(user_id.toString())
    })
    const res = await client.send(cmd)
    const decodedRes = decoder.decode(res.Payload)
    const b64 = JSON.parse(decodedRes).body.replace(/[\s"]/g, "")
    const byteString = atob(b64)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    intArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
  } catch(e) {
    return new Response((e as any).toString(), { status: 500 })
  }
  return new Response(intArray!, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "image/png",
    },
  })
}

export default get_badge
