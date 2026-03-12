import BookItem from '@/components/book-item'
import BookItemSkeleton from '@/components/book-item-skeleton'
import { BookData } from '@/types'
import { Suspense } from 'react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return {
    title: `${q}: JuiceHan Book Store 검색`,
    description: `${q} 검색 결과입니다.`,
    openGraph: {
      title: `${q}: JuiceHan Book Store 검색`,
      description: `${q} 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    },
  }
}

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`, {
    cache: 'force-cache',
  })

  if (!response.ok) throw new Error(response.statusText)

  const books: BookData[] = await response.json()

  return (
    <div>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </div>
  )
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string
  }>
}) {
  const { q } = await searchParams
  return (
    <Suspense
      fallback={new Array(3).fill(0).map((_, idx) => (
        <BookItemSkeleton key={`search-result-skeleton-${idx}`} />
      ))}
    >
      <SearchResult q={q || ''} />
    </Suspense>
  )
}
