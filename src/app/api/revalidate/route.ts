import { revalidateTag } from 'next/cache'

export async function GET() {
  await revalidateTag('random-books')
  return new Response('random books 태그 갱신 성공', { status: 200 })
}
