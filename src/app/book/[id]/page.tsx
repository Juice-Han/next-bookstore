import { BookData } from '@/types'
import style from './page.module.css'
import ReviewEditor from '@/components/review-editor'

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`, {
    cache: 'force-cache',
  })
  if (!response.ok) throw new Error(response.statusText)

  const book: BookData = await response.json()
  const { title, subTitle, description, author, publisher, coverImgUrl } = book

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  )
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
    </div>
  )
}
