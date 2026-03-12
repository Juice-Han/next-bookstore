import { BookData, ReviewData } from '@/types'
import style from './page.module.css'
import ReviewEditor from '@/components/review-editor'
import ReviewItem from '@/components/review-item'
import Image from 'next/image'
import { delay } from '@/util/delay'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {})
  if (!response.ok) throw new Error(response.statusText)

  const book: BookData = await response.json()

  return {
    title: `${book.title} - JuiceHan Book Store`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - JuiceHan Book Store`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  }
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/book/${bookId}`, {
    cache: 'force-cache',
    next: { tags: [`review-${bookId}`] },
  })
  if (!response.ok) throw new Error(response.statusText)

  const reviews: ReviewData[] = await response.json()
  return (
    <section>
      {reviews.map((review: ReviewData) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  )
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`, {
    cache: 'force-cache',
    next: { tags: [`book-detail-${bookId}`] },
  })
  if (!response.ok) throw new Error(response.statusText)

  await delay(5000)

  const book: BookData = await response.json()
  const { title, subTitle, description, author, publisher, coverImgUrl } = book

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 "${title}의 표지 이미지`} />
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
      <ReviewList bookId={id} />
    </div>
  )
}
