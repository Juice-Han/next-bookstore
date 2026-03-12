import { ReviewData } from '@/types'
import DeleteReviewItemButton from './delete-review-item-button'

export default function ReviewItem({ id, content, author, createdAt, bookId }: ReviewData) {
  return (
    <div className="flex flex-col gap-1.25 py-3.75 px-0">
      <div className="text-[14px]">{author}</div>
      <div className="bg-[rgb(240,240,240)] py-3.75 px-2.5 rounded-[5px]">{content}</div>
      <div className="flex gap-2.5 text-gray-500 text-[14px]">
        <div>{new Date(createdAt).toLocaleString()}</div>
        <div className="cursor-pointer">
          <DeleteReviewItemButton reviewId={id} bookId={bookId} />
        </div>
      </div>
    </div>
  )
}
