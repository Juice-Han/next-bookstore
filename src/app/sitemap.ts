import { BookData } from '@/types'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
    cache: 'force-cache',
  })
  if (!response.ok) throw new Error(response.statusText)

  const allBooks: BookData[] = await response.json()

  return [
    {
      url: BASE_URL,
    },
    {
      url: `${BASE_URL}/search`,
    },
    ...allBooks.map((book) => ({
      url: `${BASE_URL}/book/${book.id}`,
    })),
  ]
}
