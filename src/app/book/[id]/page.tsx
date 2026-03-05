import { BookData } from '@/types'
import style from './page.module.css'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {
      cache: 'force-cache',
    })
    if (!response.ok) throw new Error(response.statusText)

    const resultBook: BookData = await response.json()
    const { title, subTitle, description, author, publisher, coverImgUrl } = resultBook
    return (
      <div className={style.container}>
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
      </div>
    )
  } catch (err) {
    console.error(err)
    return <div>오류가 발생했습니다...</div>
  }
}
