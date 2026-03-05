import BookItem from '@/components/book-item'
import { BookData } from '@/types'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string
  }>
}) {
  const { q } = await searchParams

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`, {
      cache: 'force-cache',
    })
    if (!response.ok) throw new Error(response.statusText)
    const resultBooks: BookData[] = await response.json()
    return (
      <div>
        {resultBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    )
  } catch (err) {
    console.error(err)
    return <div>오류가 발생했습니다...</div>
  }
}
