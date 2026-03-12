import style from './book-page-skeleton.module.css'

export default function BokPageSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
      <div className={style.title}></div>
      <div className={style.subTitle}></div>
      <div className={style.author}></div>
      <div className={style.description}></div>
    </div>
  )
}
