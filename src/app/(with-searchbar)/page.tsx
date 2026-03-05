import BookItem from '@/components/book-item'
import style from './page.module.css'
import { BookData } from '@/types'

export default async function Page() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  )
}

async function AllBooks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
      cache: 'force-cache',
    })
    if (!response.ok) throw new Error(response.statusText)
    const allBooks: BookData[] = await response.json()

    return (
      <>
        {allBooks.map((book) => (
          <BookItem key={`all-${book.id}`} {...book} />
        ))}
      </>
    )
  } catch (err) {
    console.error(err)
    return <div>오류가 발생했습니다...</div>
  }
}

async function RecoBooks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/random`, {
      next: { revalidate: 5 },
    })
    if (!response.ok) throw new Error(response.statusText)
    const randomBooks: BookData[] = await response.json()

    return (
      <>
        {randomBooks.map((book) => (
          <BookItem key={`all-${book.id}`} {...book} />
        ))}
      </>
    )
  } catch (err) {
    console.error(err)
    return <div>오류가 발생했습니다...</div>
  }
}
