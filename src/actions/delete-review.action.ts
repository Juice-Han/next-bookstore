'use server'

import { revalidateTag } from 'next/cache'

const deleteReviewAction = async (prevState: unknown, formData: FormData) => {
  const reviewId = formData.get('reviewId')
  const bookId = formData.get('bookId')

  if (!reviewId) {
    return {
      status: false,
      message: '삭제할 리뷰가 없습니다.',
    }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${reviewId}`, {
      method: 'delete',
    })
    if (!response.ok) throw new Error(response.statusText)

    revalidateTag(`review-${bookId}`)
    return {
      status: true,
      message: '',
    }
  } catch (e) {
    return {
      status: false,
      message: `리뷰 삭제에 실패했습니다: ${e}`,
    }
  }
}

export default deleteReviewAction
