import type { BookData } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
  priority = false,
}: BookData) {
  return (
    <Link
      href={`/book/${id}`}
      className="flex gap-3.75 px-2.5 py-5 border-b border-[rgb(220,220,220)]"
      scroll={false}
    >
      <Image
        src={coverImgUrl}
        width={80}
        height={105}
        alt={`도서 "${title}"의 표지 이미지`}
        priority={priority}
      />
      <div>
        <div className="font-bold">{title}</div>
        <div className="break-keep">{subTitle}</div>
        <br />
        <div className="text-gray-500">
          {author} | {publisher}
        </div>
      </div>
    </Link>
  )
}
