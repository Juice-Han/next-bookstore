import { ReviewData } from '@/types'
import style from './review-item.module.css'
import DeleteReviewItemButton from './delete-review-item-button'

export default function ReviewItem({ id, content, author, createdAt, bookId }: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        <div className={style.delete_btn}>
          <DeleteReviewItemButton reviewId={id} bookId={bookId} />
        </div>
      </div>
    </div>
  )
}
