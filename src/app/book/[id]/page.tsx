import { BookData, ReviewData } from '@/types'
import ReviewEditor from '@/components/review-editor'
import ReviewItem from '@/components/review-item'
import Image from 'next/image'

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
    <section className="flex flex-col gap-2.5">
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

  const book: BookData = await response.json()
  const { title, subTitle, description, author, publisher, coverImgUrl } = book

  return (
    <section className="flex flex-col gap-2.5">
      <div
        className="h-87.5 flex justify-center p-5 bg-center bg-no-repeat bg-cover relative before:content-[''] before:absolute before:inset-0 before:bg-black/70"
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 "${title}의 표지 이미지`}
          className="z-1 max-h-87.5 w-auto h-full"
        />
      </div>
      <div className="text-lg font-bold">{title}</div>
      <div className="text-gray-500">{subTitle}</div>
      <div className="text-gray-500">
        {author} | {publisher}
      </div>
      <div className="bg-[rgb(245,245,245)] p-3.75 leading-[1.3] whitespace-pre-line rounded-[5px]">
        {description}
      </div>
    </section>
  )
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="flex flex-col gap-12.5">
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  )
}
