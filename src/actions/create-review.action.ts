'use server'

import { revalidateTag } from 'next/cache'

const createReviewAction = async (prevState: unknown, formData: FormData) => {
  const bookId = formData.get('bookId')
  const content = formData.get('content')
  const author = formData.get('author')
  await new Promise((resolve) => setTimeout(resolve, 3000))
  try {
    if (!content || !author) throw new Error('잘못된 요청입니다.')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: 'post',
      body: JSON.stringify({ bookId, content, author }),
    })
    // revalidatePath(`/book/${bookId}`) // 풀라우터 캐시와 캐싱된 패치 데이터를 모두 무효화하고 새로 생성한 페이지를 브라우저에 전달한다.
    revalidateTag(`review-${bookId}`) // 해당 태그를 가진 데이터 캐시를 무효화하고 페이지를 다시 생성해 브라우저에 전달한다.

    return {
      status: true,
      message: '리뷰를 성공적으로 추가했습니다.',
    }
  } catch (e) {
    console.error(e)
    return {
      status: false,
      message: `새로운 리뷰를 추가하지 못했습니다: ${e}`,
    }
  }
}

export default createReviewAction
