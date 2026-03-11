import { revalidatePath, revalidateTag } from 'next/cache'
import style from './review-editor.module.css'

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const createReviewAction = async (formData: FormData) => {
    'use server'

    const bookId = formData.get('bookId')
    const content = formData.get('content')
    const author = formData.get('author')

    try {
      if (!content || !author) throw new Error('잘못된 요청입니다.')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
        method: 'post',
        body: JSON.stringify({ bookId, content, author }),
      })
      revalidatePath(`/book/${bookId}`) // 풀라우터 캐시와 캐싱된 패치 데이터를 모두 무효화하고 새로 생성한 페이지를 브라우저에 전달한다.
    } catch (e) {
      console.error(e)
    }

    revalidateTag(`review-${bookId}`)
  }
  return (
    <section className={style.container}>
      <form action={createReviewAction}>
        <input type="hidden" name="bookId" value={bookId} readOnly />
        <textarea name="content" placeholder="리뷰 내용" required />
        <div className={style.submit_container}>
          <input name="author" placeholder="작성자" required />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  )
}
