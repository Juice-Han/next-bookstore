'use client'

import { useActionState, useEffect, useState } from 'react'
import style from './review-editor.module.css'
import createReviewAction from '@/actions/create-review.action'

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, action, isPending] = useActionState(createReviewAction, null)

  useEffect(() => {
    if (state && !state.status) {
      alert(state.message)
    }
  }, [state])

  return (
    <section className={style.container}>
      <form action={action}>
        <input type="hidden" name="bookId" value={bookId} readOnly />
        <textarea disabled={isPending} name="content" placeholder="리뷰 내용" required />
        <div className={style.submit_container}>
          <input disabled={isPending} name="author" placeholder="작성자" required />
          <button disabled={isPending} type="submit">
            작성하기
          </button>
        </div>
      </form>
    </section>
  )
}
