'use client'

import { useActionState, useEffect, useState } from 'react'
import createReviewAction from '@/actions/create-review.action'

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, action, isPending] = useActionState(createReviewAction, null)

  useEffect(() => {
    if (state && !state.status) {
      alert(state.message)
    }
  }, [state])

  return (
    <section className="flex flex-col gap-1.25">
      <form action={action}>
        <input
          className="p-2.5 box-border border border-[rgb(220,220,220)] rounded-[5px]"
          type="hidden"
          name="bookId"
          value={bookId}
          readOnly
        />
        <textarea
          className="w-full h-full resize-y p-2.5 box-border border border-[rgb(220,220,220)] rounded-[5px]"
          disabled={isPending}
          name="content"
          placeholder="리뷰 내용"
          required
        />
        <div className="flex justify-end gap-1.25">
          <input
            className="p-2.5 box-border border border-[rgb(220,220,220)] rounded-[5px]"
            disabled={isPending}
            name="author"
            placeholder="작성자"
            required
          />
          <button
            className="w-20 p-2.5 bg-[rgb(37,147,255)] text-white border-none rounded-[5px] cursor-pointer"
            disabled={isPending}
            type="submit"
          >
            작성하기
          </button>
        </div>
      </form>
    </section>
  )
}
